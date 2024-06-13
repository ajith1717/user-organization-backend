const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const managementFormSchema = new mongoose.Schema({
    patientId: { type: String, default: "", required: true },
    caseId: { type: String, default: "", required: true },
    formId: { type: String, default: "", required: true },
    date: { type: Date, default: new Date() },
    time: { type: String, default: "" },
    seenBy: { type: String, default: "" },
    issues: { type: String, default: "" },
    findings: { type: String, default: "" },
    investigations: { type: String, default: "" },
    treatments: { type: String, default: "" },
});

managementFormSchema.index({ "patientId": 1, "caseId": 1, "formId": 1 }, { unique: true })
managementFormSchema.set("timestamps", true)

module.exports = ManagementForm = mongoDbConn.model("management_form", managementFormSchema);





