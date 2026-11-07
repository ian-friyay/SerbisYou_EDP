const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

const routes = require('./routes');
const { testConnection } = require('./config/db');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// Middleware configuration
app.use(cors({
  origin: [CLIENT_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/health', async (req, res) => {
  const dbStatus = await testConnection();
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbStatus,
    directus: {
      configured: Boolean(process.env.DIRECTUS_URL),
      url: process.env.DIRECTUS_URL || 'Not specified',
    },
  });
});

// API Routes
app.use('/api', routes);

// 404 Handler & Global Error Handler
app.use(notFoundHandler);
app.use(errorHandler);

// Setup Socket.io for Real-time WebSocket Chat
const io = new Server(server, {
  cors: {
    origin: [CLIENT_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`[Socket.io] Student connected: ${socket.id}`);

  // Join a dedicated conversation/transaction room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`[Socket.io] User ${socket.id} joined transaction chat room: ${roomId}`);
    socket.to(roomId).emit('user_joined', { userId: socket.id, roomId });
  });

  // Handle sending and broadcasting real-time chat messages
  socket.on('send_message', (data) => {
    const { roomId, senderId, senderName, message, timestamp } = data;
    console.log(`[Socket.io] Message in room ${roomId} from ${senderName || senderId}: ${message}`);
    // Broadcast to everyone in the room including sender or others
    io.to(roomId).emit('receive_message', {
      senderId,
      senderName,
      message,
      timestamp: timestamp || new Date().toISOString(),
      roomId,
    });
  });

  // Disconnect handler
  socket.on('disconnect', () => {
    console.log(`[Socket.io] Student disconnected: ${socket.id}`);
  });
});

// Start HTTP + WebSocket Server
server.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 SerbisYou Backend Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`💬 Socket.io WebSocket ready for campus chat`);
  console.log(`===============================================`);
});

module.exports = { app, server, io };
