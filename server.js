// declare express
const express = require("express")

const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const swaggerSetup = require('./swagger'); // Adjust the path if necessary


const swaggerUi = require('swagger-ui-dist');
const cors = require('cors');
//  use route 
const patientRoute = require("./routes/patients")
const casesRoute = require("./routes/cases");
app.use(bodyParser.json({ limit: "20MB" }));
// Serve Swagger UI static files
app.use('/swagger-ui-dist', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));
// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, 'index.html'));
// });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Swagger setup
swaggerSetup(app);
// 👇️ Configure CORS
app.use(cors());
app.get("/", (req, res) => { res.send("Express on Vercel ..."); });
// app.use("/api/user", patientRoute);
app.use("/api/case", casesRoute);




const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);

const { createTestForm } = require("./services/caseServices");

// remove cors for socket io dashboard
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        // origin: "http://localhost:5173",
        // origin: ["https://admin.socket.io", "*", "*:*"],
        methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
        credentials: true
        // cors: {
        //     // at line 47
        //     origin: "http://localhost:5173"  // frontend server
        // }
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
    // disconnect listener
    socket.on("disconnect", async (data) => {
        let roomName = "case-details"
        console.log("====== DISCONNECT SOCKET CONNECTION FROM STAFF DEVICE ====== START ======")
        io.in(roomName).emit("msg", "all device left online")
        io.in(roomName).disconnectSockets()
        socket.leave(roomName)
        console.log("====== DISCONNECT SOCKET CONNECTION FROM STAFF DEVICE ====== END ======")
    })


});
// POST API to handle form submission
app.post('/api/case/v1/test', async (req, res) => {
    try {
        let result = await createTestForm(req.body);
        if (result.success) {
            let payload = { caseId: result.data.caseId, name: result.data.name };
            io.emit('formAdded', { data: JSON.stringify(payload) });
        }
        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
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
// module.exports = { server: httpServer, io };


// start.js

const dotenv = require('dotenv');
dotenv.config();

const showBanner = require('node-banner');

const port = process.env.PORT || 5001;

httpServer.listen(port, async () => {
    await showBanner('ADK ER', '--------------------------------------', 'red');
    console.log(`SERVER START RUNNING ON PORT ${port}`);
});

// exports
module.exports = app



// ssh -i /Users/subramaniam/Documents/adk_er.pem ec2-user@65.2.125.86
