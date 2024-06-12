const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    patientId: { type: String, required: true },
    hospitalId: { type: String, required: true },
    DOB: { type: String, },
    nationalId: { type: String, },
    age: { type: Number, required: true, default: 0 },
    sex: { type: String, required: true },
});

patientSchema.index({ "patientId": 1 }, { unique: true })
patientSchema.set("timestamps", true)

module.exports = Patients = mongoDbConn.model("patients", patientSchema);





