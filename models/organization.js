const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    users: { type: [mongoose.Schema.Types.ObjectId], ref: 'users', default: [] },
});

organizationSchema.set("timestamps", true)

module.exports = Organization = mongoDbConn.model("organization", organizationSchema);





