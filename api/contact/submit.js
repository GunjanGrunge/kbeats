import { v4 as uuidv4 } from 'uuid';
import { connectDB } from '../_lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, project_type } = req.body;

    const db = await connectDB();

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
}
