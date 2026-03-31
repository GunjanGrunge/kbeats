import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, closeDB } from './db.js';
import chatRoutes from './routes/chat.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || '*',
}));
app.use(express.json());

// Initialize database
let server;
connectDB()
  .then(() => {
    // Root route
    app.get('/api/', (req, res) => {
      res.json({ message: 'K Beats API - Music Production Services' });
    });

    // Routes
    app.use('/api/chat', chatRoutes);
    app.use('/api/contact', contactRoutes);

    // Health check
    app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });

    // Start server
    server = app.listen(PORT, () => {
      console.log(`🎵 K Beats API running on http://localhost:${PORT}`);
      console.log(`📍 API Base: http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down...');
  if (server) {
    server.close(() => {
      console.log('Server closed');
      closeDB().then(() => process.exit(0));
    });
  }
});
