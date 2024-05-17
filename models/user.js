const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    // organization: { type: [mongoose.Schema.Types.ObjectId], ref: 'Organization', default: null },
    // Add other user fields as needed
});

userSchema.index({ "email": 1 }, { unique: true })
userSchema.set("timestamps", true)

module.exports = Users = mongoDbConn.model("users", userSchema);





