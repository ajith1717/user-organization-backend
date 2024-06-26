

exports.registerConnection = async (io, socket) => {
    console.log("====== RECEIVED SOCKET CONNECTION REQUEST FROM PARENT DEVICE ====== START ======")
    let roomName = "case-details"
    socket.join(roomName);
    //send msg to all members in room
    io.to(roomName).emit("basic", {})
    //disconnect listener
    socket.on("disconnect", async (data) => {
        console.log("====== DISCONNECT SOCKET CONNECTION FROM PARENT DEVICE ====== START ======")
        socket.to(roomName).emit("parentDeviceList", parentList)
        if (parentList.length < 1) {
            io.in(roomName).emit("msg", "all parents left online")
            io.in(roomName).disconnectSockets()
        }
        socket.leave(roomName)
        console.log("====== DISCONNECT SOCKET CONNECTION FROM PARENT DEVICE ====== END ======")
    })
    // Listen to the device disable enable 
    console.log("====== RECEIVED SOCKET CONNECTION REQUEST FROM PARENT DEVICE ====== END ======")
}