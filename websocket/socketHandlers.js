const { io } = require("./socket");

// socketUtils.js
const sendMessageStaff = (type, message, data) => {
    console.log("====== RECEIVED SOCKET CONNECTION REQUEST FROM STAFF DEVICE ====== START ======");
    io.emit(type === "created" ? "formAdded" : "formUpdated", { sender: 'Server', message, data: JSON.stringify(data), type });
    console.log(`Server sent message: ${JSON.stringify(data)}`);
};

module.exports = { sendMessageStaff };
// const app = require("../server");
// const { Server } = require("socket.io");
// const { createServer } = require("http");

// const httpServer = createServer(app);
// // remove cors for socket io dashboard
// const io = new Server(httpServer, {
//     cors: {
//         origin: ["https://admin.socket.io", "*", "*:*"],
//         methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
//         credentials: true
//     },
// });

// // Function to send messages to all members in a room
// exports.sendMessageStaff = (type, message, data) => {


//     console.log("====== RECEIVED SOCKET CONNECTION REQUEST FROM STAFF DEVICE ====== START ======");
//     // io.to(room).emit('serverMessageToRoom', { sender: 'Server', message: JSON.stringify(data) });

//     io.emit('serverMessageToRoom', { sender: 'Server', message, data: JSON.stringify(data), type });
//     console.log(`Server sent message: ${JSON.stringify(data)}`);


// };
// // async function sendMessageToRoom(io, socket, type, message, data) {
// //     console.log("====== RECEIVED SOCKET CONNECTION REQUEST FROM STAFF DEVICE ====== START ======");
// //     io.emit(type === "created" ? "formAdded" : "formUpdated", { sender: 'Server', message, data: JSON.stringify(data), type });
// //     console.log(`Server sent message: ${JSON.stringify(data)}`);
// //     // let roomName = "case-details"
// //     // socket.join(roomName);
// //     // const room = 'case-details';
// //     // //send msg to all members in room
// //     // let data = { a: 1, b: 2, c: 3 }
// //     // io.to(room).emit('serverMessageToRoom', { sender: 'Server', message: JSON.stringify(data) });
// //     // console.log(`Server sent message to room ${room}: ${data.toString()}}`);



// //     // //disconnect listener
// //     // socket.on("disconnect", async (data) => {
// //     //     let roomName = "case-details"
// //     //     console.log("====== DISCONNECT SOCKET CONNECTION FROM STAFF DEVICE ====== START ======")
// //     //     io.in(roomName).emit("msg", "all device left online")
// //     //     io.in(roomName).disconnectSockets()
// //     //     socket.leave(roomName)
// //     //     console.log("====== DISCONNECT SOCKET CONNECTION FROM STAFF DEVICE ====== END ======")
// //     // })
// // }
