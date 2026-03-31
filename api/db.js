import { MongoClient, ServerApiVersion } from 'mongodb';

let db = null;
let client = null;

export async function connectDB() {
  try {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
    const dbName = process.env.DB_NAME || 'kbeats';

    client = new MongoClient(mongoUrl, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    db = client.db(dbName);

    // Initialize collections and indexes
    await initCollections();

    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
}

async function initCollections() {
  try {
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);

    // Create chat_messages collection if it doesn't exist
    if (!collectionNames.includes('chat_messages')) {
      await db.createCollection('chat_messages');
      console.log("✓ Created 'chat_messages' collection");
    }
    await db.collection('chat_messages').createIndex('session_id');
    await db.collection('chat_messages').createIndex('timestamp');

    // Create inquiries collection if it doesn't exist
    if (!collectionNames.includes('inquiries')) {
      await db.createCollection('inquiries');
      console.log("✓ Created 'inquiries' collection");
    }
    await db.collection('inquiries').createIndex('session_id');
    await db.collection('inquiries').createIndex('email');
    await db.collection('inquiries').createIndex('created_at');

    console.log('✓ Database collections initialized');
  } catch (error) {
    console.error('Error initializing collections:', error.message);
  }
}

export function getDB() {
  if (!db) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return db;
}

export async function closeDB() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
}
