import { MongoClient, ServerApiVersion } from 'mongodb';

let cachedClient = null;

export async function connectDB() {
  if (cachedClient) {
    return cachedClient.db(process.env.DB_NAME || 'kbeats');
  }

  const client = new MongoClient(process.env.MONGO_URL, {
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
