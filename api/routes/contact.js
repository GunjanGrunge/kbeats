import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDB } from '../db.js';

const router = express.Router();

router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, message, project_type } = req.body;

    const db = getDB();

    const inquiry = {
      id: uuidv4(),
      session_id: `contact-${uuidv4()}`,
      name,
      email,
      phone: phone || null,
      project_type: project_type || null,
      requirements: message,
      conversation_history: [],
      status: 'pending',
      created_at: new Date(),
    };

    await db.collection('inquiries').insertOne(inquiry);

    res.json({
      success: true,
      message: 'Thank you! We will get back to you soon.',
    });
  } catch (error) {
    console.error('Error in contact submit:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/inquiries', async (req, res) => {
  try {
    const db = getDB();
    const inquiries = await db
      .collection('inquiries')
      .find()
      .sort({ created_at: -1 })
      .toArray();

    res.json(inquiries);
  } catch (error) {
    console.error('Error in get inquiries:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
