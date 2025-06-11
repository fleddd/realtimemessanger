import express from "express";
import http from "http";
import { Types } from "mongoose";
import { Server } from "socket.io";
import Message from "../models/Message.model";
import User from "../models/User.model";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

type ObjectType = {
  userId?: string;
};

const userSocketMap: ObjectType = {};

export const getReceiverSocketId = (userId: string | Types.ObjectId) =>
  userSocketMap[userId as keyof ObjectType];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId as keyof ObjectType] = socket.id;

  socket.on("messageSeen", async (messagesIds: string[]) => {
    console.log(messagesIds);
    await Message.updateMany(
      { _id: { $in: messagesIds } },
      { $set: { seen: true } }
    );
  });

  io.emit("usersCount", Object.keys(userSocketMap));

  socket.on("disconnect", async () => {
    const lastSeenTime = Date();
    await User.findByIdAndUpdate(
      userId,
      { lastSeenTime: lastSeenTime },
      { new: true }
    );
    delete userSocketMap[userId as keyof ObjectType];
    io.emit("usersCount", Object.keys(userSocketMap), lastSeenTime, userId);
  });
});

export { app, io, server };
