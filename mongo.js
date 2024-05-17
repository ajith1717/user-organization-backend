// import mongoose
const mongoose = require("mongoose");

const mongoDbConString = "mongodb+srv://subramaniamdev01:qwerty1234@cluster.fzqbthd.mongodb.net/?retryWrites=true&w=majority"
// 
var mongoDbConn = mongoose.createConnection(mongoDbConString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
module.exports = {
    mongoDbConn
};
