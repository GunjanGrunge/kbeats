import { v4 as uuidv4 } from 'uuid';
import { waitUntil } from '@vercel/functions';
import { connectDB } from '../_lib/db.js';
import { getChatResponse } from '../_lib/chatbot.js';
import { emailService } from '../_lib/email-service.js';

export const config = { runtime: 'nodejs' };

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    }),
  ]);
}

async function sendLeadEmailBackground(sessionId) {
  try {
    const db = await withTimeout(connectDB(), 5000, 'DB connect');
    const inquiry = await db.collection('inquiries').findOne({ session_id: sessionId });
    if (inquiry) {
      await emailService.sendLeadNotification(inquiry);
    }
  } catch (error) {
    console.error('Error sending lead email:', error.message);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id, message } = req.body;

    if (!session_id || !message) {
      return res.status(400).json({ error: 'Missing session_id or message' });
    }

    let db = null;
    let isNewInquiry = false;
    let conversationHistory = [];

    // DB is best-effort. Never block chat generation on DB availability.
    try {
      db = await withTimeout(connectDB(), 5000, 'DB connect');

      // Save user message
      const userMessage = {
        id: uuidv4(),
        session_id,
        role: 'user',
        content: message,
        timestamp: new Date(),
      };
      await db.collection('chat_messages').insertOne(userMessage);

      const inquiry = await db.collection('inquiries').findOne({ session_id });
      isNewInquiry = !inquiry;

      if (isNewInquiry) {
        const inquiryData = {
          id: uuidv4(),
          session_id,
          name: null,
          email: null,
          phone: null,
          project_type: null,
          requirements: message,
          conversation_history: [
            {
              role: 'user',
              content: message,
              timestamp: new Date().toISOString(),
            },
          ],
          status: 'pending',
          created_at: new Date(),
        };
        await db.collection('inquiries').insertOne(inquiryData);
      } else {
        await db.collection('inquiries').updateOne(
          { session_id },
          {
            $push: {
              conversation_history: {
                role: 'user',
                content: message,
                timestamp: new Date().toISOString(),
              },
            },
          }
        );
      }

      conversationHistory =
        (await db.collection('inquiries').findOne({ session_id }))?.conversation_history || [];
    } catch (dbError) {
      console.error('DB unavailable, continuing without persistence:', dbError.message);
      db = null;
      isNewInquiry = false;
      conversationHistory = [];
    }

    const response = await getChatResponse(session_id, message, conversationHistory);

    if (db) {
      try {
        const assistantMessage = {
          id: uuidv4(),
          session_id,
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        };
        await db.collection('chat_messages').insertOne(assistantMessage);

        await db.collection('inquiries').updateOne(
          { session_id },
          {
            $push: {
              conversation_history: {
                role: 'assistant',
                content: response,
                timestamp: new Date().toISOString(),
              },
            },
          }
        );

        if (isNewInquiry) {
          waitUntil(sendLeadEmailBackground(session_id));
        }
      } catch (persistError) {
        console.error('Failed to persist assistant response:', persistError.message);
      }
    }

    res.json({
      session_id,
      response,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error in chat message handler:', error);
    res.status(500).json({ error: error.message });
  }
}
