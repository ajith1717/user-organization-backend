const app = require("../server");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);

const { sendMessageStaff } = require('./socketHandlers'); // Import sendMessageStaff

// remove cors for socket io dashboard
const io = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io", "*", "*:*"],
        methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
        credentials: true
    },
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle joining rooms
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });


    // Handle joining rooms or specific URLs
    socket.on('joinUrl', (url) => {
        socket.join(url);
        console.log(`User ${socket.id} joined URL: ${url}`);
    });

    // sendMessageToRoom(io, socket)
    // Handle messages from client to room
    socket.on('clientMessageToRoom', ({ room, message }) => {
        io.to(room).emit('serverMessageToRoom', { sender: socket.id, message });
        console.log(`Message from ${socket.id} to room ${room}: ${message}`);
    });


});

// const sendMessageStaff = (type, message, data) => {
//     console.log("====== RECEIVED SOCKET CONNECTION REQUEST FROM STAFF DEVICE ====== START ======");
//     io.emit(type === "created" ? "formAdded" : "formUpdated", { sender: 'Server', message, data: JSON.stringify(data), type });
//     console.log(`Server sent message: ${JSON.stringify(data)}`);
// };


// const socketHandlers = require("./socketHandlers");

// const onConnection = (socket) => {
//     socketHandlers(io, socket);
// }


// io.on("connection", onConnection);
module.exports = { server: httpServer, io, sendMessageStaff };