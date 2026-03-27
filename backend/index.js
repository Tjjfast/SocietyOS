const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');
const { connectMongo, connectPG } = require('./src/shared/config/db');
require('dotenv').config();
require('./src/modules/notification/notification.worker');
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

// Make io available everywhere
app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Each user joins their own room by userId
  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const start = async () => {
  await connectMongo();
  await connectPG();
  server.listen(process.env.PORT || 5000, () => {
    console.log('SocietyOS API running');
  });
};

start();