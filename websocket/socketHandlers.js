const { io } = require("./socket");

// socketUtils.js
const sendMessageStaff = (type, message, data) => {
    console.log("====== RECEIVED SOCKET CONNECTION REQUEST FROM STAFF DEVICE ====== START ======");
    io.emit(type === "created" ? "formAdded" : "formUpdated", { sender: 'Server', message, data: JSON.stringify(data), type });
    console.log(`Server sent message: ${JSON.stringify(data)}`);
};

module.exports = { sendMessageStaff };