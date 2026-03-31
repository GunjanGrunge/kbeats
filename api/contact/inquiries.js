import { connectDB } from '../_lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await connectDB();
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
}
