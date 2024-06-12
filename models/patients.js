const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const patientSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true, },
    hospitalId: { type: String, required: true },
    patientId: { type: String, required: true, unique: true, default: Math.random().toString(36).substring(2, 8).toUpperCase() },
    DOB: { type: String, },
    nationalId: { type: String, },
    age: { type: Number, required: true, default: 0 },
    sex: { type: String, required: true },

});

patientSchema.index({ "patientId": 1 }, { unique: true })
patientSchema.set("timestamps", true)

module.exports = Users = mongoDbConn.model("patients", patientSchema);





