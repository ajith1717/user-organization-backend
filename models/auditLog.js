const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const auditLogSchema = new mongoose.Schema({
    caseId: { type: String, default: null, required: true },
    action: { type: String, default: null },
    case: { type: String, default: "", },
    updatedBy: { type: String, default: null },
    changes: { type: Object, default: {} },
    updatedTime: { type: Date, default: new Date() },
});

auditLogSchema.set("timestamps", true)

module.exports = AuditLog = mongoDbConn.model("audit_log", auditLogSchema);





