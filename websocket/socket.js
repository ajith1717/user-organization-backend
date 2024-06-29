const app = require("../server");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { fetchAllCaseDetailsByDays, getFormDetailsByCaseId } = require("../services/caseServices");

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
        credentials: true
    }
});


// load msg module and give it the io variable
// var caseServices = require('../services/caseServices')(io);
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

    socket.on('syncData', async (message) => {
        console.log('message from client:', message);
        // Trigger a function based on the received message
        let syncData = await fetchAllCaseDetailsByDays();
        if (syncData.success) {
            io.emit('syncData', JSON.stringify(syncData.data));
        }
    });
    // Handle incoming connection query
    // if (socket.handshake.query.type === "basic_case_updated") {
    //     // Example function to fetch data
    //     fetchDataAndEmit(socket.handshake.query);
    // }
    socket.on('case_details', async ({ caseId, type, formId }) => {
        fetchDataAndEmit(caseId, type, formId);
    });

    // socket.on('basic_case', async (message) => {
    //     fetchDataAndEmit(message);
    // });

    // Function to fetch data and emit to "caseDetails" event
    async function fetchDataAndEmit(caseId, type, formId) {
        try {
            // fetch case details using caseId
            let caseDetails = getFormDetailsByCaseId(caseId, type, formId)
            if (caseDetails.success) {
                io.emit('case_details', { caseId, type, formId, data: caseDetails.data });
            }

            // Emit data to "caseDetails" event

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    // Disconnect listener
    socket.on("disconnect", async (data) => {
        let roomName = "case-details";
        console.log("====== DISCONNECT SOCKET CONNECTION FROM STAFF DEVICE ====== START ======");
        io.in(roomName).emit("msg", "all device left online");
        io.in(roomName).disconnectSockets();
        socket.leave(roomName);
        console.log("====== DISCONNECT SOCKET CONNECTION FROM STAFF DEVICE ====== END ======");
    });
});


// POST API to handle form submission
// app.post('/api/case/v1/test', async (req, res) => {
//     try {
//         console.log(req.body)
//         let result = await createTestForm(req.body);
//         if (result.success) {
//             let payload = { caseId: result.data.caseId, name: result.data.name };
//             io.emit('formAdded', JSON.stringify(payload));
//         }
//         res.status(200).json({ message: 'Form submitted successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// POST API to handle form submission
// app.post('/api/socket', async (req, res) => {
//     try {
//         console.log(req.body)
//         io.emit(req.body?.eventName, JSON.stringify(req.body?.data));
//         res.status(200).json({ message: 'message sent successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

exports.sendSocketMessage = (eventName, data) => {
    if (eventName != null) {
        io.emit(eventName, JSON.stringify(data));
    }

}


// Corrected export statement
module.exports = { server: httpServer, io };
