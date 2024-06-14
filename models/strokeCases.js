const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const strokeCasesSchema = new mongoose.Schema({
    patientId: { type: String, default: "", required: true },
    caseId: { type: String, default: "", required: true },
    date: { type: Date, default: new Date() },
    unknownTimeOfOnSet: { type: Boolean, default: false },
    timeElapsed: { type: String, default: "" },
    GBRS: { type: String, default: "" },
    preMorbidIndependent: { type: Boolean, default: false },
    syncope: { type: String, default: "" },
    seizure: { type: String, default: "" },
    faceWeakNess: { type: String, default: "" },
    armWeakNess: { type: String, default: "" },
    speechDisturbance: { type: String, default: "" },
    visualLoss: { type: String, default: "" },
    legWeakNess: { type: String, default: "" },
    total: { type: Number, default: 0 },
    notes: { type: String, default: "" },


});

strokeCasesSchema.index({ "patientId": 1, "caseId": 1 }, { unique: true })
strokeCasesSchema.set("timestamps", true)

module.exports = StrokeCases = mongoDbConn.model("stroke_cases", strokeCasesSchema);





