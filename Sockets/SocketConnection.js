// const { Notification } = require("../Model/NotificationModel")
// const {
//   saveNotificationToDB,
// } = require("../Controller/Notification/NotificationController");

// const { Server } = require('socket.io');

// let io;

// const initSocket = (httpServer) => {
//   io = new Server(httpServer, {
//     cors: {
//       origin: "*", // client-side URL
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     // Join chat room
//     socket.on('joinRoom', ( senderId, receiverId ) => {
//       const roomId = [senderId, receiverId].sort().join('_');
//       socket.join(roomId);
//       console.log(`${senderId} joined room ${roomId}`);
//     });
//     // Handle sending a message
//     socket.on("notification", async (notificationData) => {
//       console.log("notification", notificationData);
//       const savednotificationData =  await saveNotificationToDB(notificationData)
//       console.log(savednotificationData,'notification');
//       io.emit('notification', savednotificationData)

//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
//     });
//   });
// };

// const getSocket = () => {
//   if (!io) {
//     throw new Error('Socket.io not initialized');
//   }
//   return io;
// };

// module.exports = {
//   initSocket,
//   getSocket,
// };
