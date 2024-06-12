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
    syncope: { type: Boolean, default: false },
    seizure: { type: Boolean, default: false },
    faceWeakNess: { type: Boolean, default: false },
    armWeakNess: { type: Boolean, default: false },
    speechDisturbance: { type: Boolean, default: false },
    visualLoss: { type: Boolean, default: false },
    legWeakNess: { type: Boolean, default: false },
    total: { type: Number, default: 0 },
    notes: { type: String, default: "" },


});

strokeCasesSchema.index({ "patientId": 1, "caseId": 1 }, { unique: true })
strokeCasesSchema.set("timestamps", true)

module.exports = StrokeCasesSchema = mongoDbConn.model("cardiacCases", strokeCasesSchema);





