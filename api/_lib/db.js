import { MongoClient, ServerApiVersion } from 'mongodb';
import { ensureEnvLoaded } from './load-env.js';

ensureEnvLoaded();

let cachedClient = null;

function getMongoUri() {
  const uri = process.env.MONGO_URL || process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MongoDB connection string is missing. Set MONGO_URL or MONGODB_URI.');
  }

  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    throw new Error('MongoDB connection string must start with mongodb:// or mongodb+srv://');
  }

  return uri;
}

export async function connectDB() {
  if (cachedClient) {
    return cachedClient.db(process.env.DB_NAME || 'kbeats');
  }

  const client = new MongoClient(getMongoUri(), {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  cachedClient = client;
  return client.db(process.env.DB_NAME || 'kbeats');
}
