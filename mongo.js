// import mongoose
const mongoose = require("mongoose");

const mongoDbConString = "mongodb+srv://adkerapp:QwirvxiJnqcwDoSy@adker-app.38kfu6y.mongodb.net/"
var mongoDbConn = mongoose.createConnection(mongoDbConString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
module.exports = {
    mongoDbConn
};
