// @ts-nocheck
import { Server } from "socket.io";
import http from "http";
let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: true,
    },
  });
  io.of("/chat").on("connection", (socket) => {
    const roomId = socket.handshake.query.roomId;
    socket.join(roomId);
    socket.to(roomId).emit("join", `${roomId} chatroom join`);
    socket.on("disconnect", () => {
      socket.leave(roomId);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io has not been initialized");
  }
  return io;
};
