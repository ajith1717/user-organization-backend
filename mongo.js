// import mongoose
const mongoose = require("mongoose");

const mongoDbConString = "mongodb+srv://adkerapp:QwirvxiJnqcwDoSy@adker-app.38kfu6y.mongodb.net/"
// "mongodb+srv://subramaniamdev01:qwerty1234@cluster.fzqbthd.mongodb.net/?retryWrites=true&w=majority"
// 
var mongoDbConn = mongoose.createConnection(mongoDbConString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
module.exports = {
    mongoDbConn
};
