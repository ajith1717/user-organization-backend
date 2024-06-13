const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const followUpFormSchema = new mongoose.Schema({
    patientId: { type: String, default: "", required: true },
    caseId: { type: String, default: "", required: true },
    formId: { type: String, default: "", required: true },
    date: { type: Date, default: new Date() },
    time: { type: String, default: "" },
    seenBy: { type: String, default: "" },
    newIssues: { type: String, default: "" },
    reports: { type: String, default: "" },
    investigations: { type: String, default: "" },
    treatments: { type: String, default: "" },
});

followUpFormSchema.index({ "patientId": 1, "caseId": 1, "formId": 1 }, { unique: true })
followUpFormSchema.set("timestamps", true)

module.exports = FollowUp = mongoDbConn.model("follow_up", followUpFormSchema);





