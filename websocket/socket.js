const app = require("../server");
const { createServer } = require("http");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const { instrument } = require("@socket.io/admin-ui");
const { registerConnection } = require("./socketHandlers");

// remove cors for socket io dashboard
const io = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io", "*", "*:*"],
        methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
        credentials: true
    },
    // pingTimeout:2000,
    // pingInterval:4000
});
// io.set('pingTimeout', 2000); // Set ping timeout to 2000 milliseconds (2 seconds)
// io.set('pingInterval', 10000); // Set ping interval to 10000 milliseconds (10 seconds)


// connect socket io dev dashboard
instrument(io, {
    auth: false
});
// io.use(async (socket, next) => {
//     // console.log("Payload is there");
//     console.log("==========RECEIVING SOCKET REQUEST TO SERVER ================")
//     try {
//         const token = socket.handshake.auth.token || socket.handshake.headers.authorization;
//         console.log("socket.handshake.auth.token :  ", socket.handshake.auth.token)
//         console.log("socket.handshake.headers.authorization : ", socket.handshake.headers.authorization)
//         console.log("socket.handshake.query : ", socket.handshake.query)

//         let payload = jwt.verify(token, commonKeys.secretKey);
//         if (payload.gId) {
//             let guardian = await getRequiredGuardianDetailsById(payload.gId, ["_id", "email", "phone", "familyId", "name"])
//             if (guardian.success && guardian.data) {
//                 let data = {
//                     email: guardian.data.email,
//                     fId: guardian.data.familyId,
//                     gId: guardian.data._id,
//                     name: guardian.data.name,
//                     phone: guardian.data.phone
//                 }
//                 payload = {
//                     ...payload,
//                     ...data,
//                 }
//             }
//         }
//         // id = payload._id;
//         console.log('socket payload', payload);
//         if (payload) {
//             console.log("token verified");
//             socket.user = payload
//             next();
//         } else {
//             console.log("not authorized");
//             const err = new Error("not authorized");
//             err.data = { content: "Please retry later" };
//             return next(err)
//         }
//     } catch (err) {
//         console.log("err-- socket connection ", err)
//         return next(err)
//     }

// });

io.on("connection", async (socket) => {
    //Connect to room
    console.log('socket.handshake.query.type ========', socket.handshake.query.type)
    console.log("socket cookie ======>>>>> ", socket.handshake.headers.cookie)
    registerConnection(io, socket)
});


exports.server = httpServer