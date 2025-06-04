//Packages
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";

//Chating
import http from 'http';
import { Server } from 'socket.io';

//Routes Files
import authRoutes from './Routes/authRoute.js';
import postRoutes from './Routes/postRoute.js';
import messageRoutes from './Routes/messageRoute.js';
import userRoutes from './Routes/userRoute.js';

//MessageModel
import Message from '../Server/Models/messageModel.js';


//Run Backend Server
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "petgram", 
    });
    console.log(`✅ MongoDB connected: ${conn.connection.name}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};
connectDB();


//To fetch frontend routes
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true               
}));
app.use(express.json());




//Socketio
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your frontend URL
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('🟢 New user connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId); // Join room = user UID
    console.log(`📦 User ${userId} joined room`);
  });

  socket.on('sendMessage', ({ from, to, text }) => {
    console.log(`📩 Message from ${from} to ${to}: ${text}`);

    // Save message to MongoDB
    const newMsg = new Message({ from, to, text });
    newMsg.save();

    // Emit message to the recipient
    io.to(to).emit('receiveMessage', { from, text });
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//Post Image route
app.use("/api/posts", postRoutes);

app.use("/api/chat", messageRoutes);

//Start Server
server.listen(PORT, () => {
  console.log(`Server + Socket.IO listening on port ${PORT}...`);
});

// app.listen(PORT, ()=>{
//   console.log(`Listening on Port ${PORT}`);
// });