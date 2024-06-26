const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const testFormSchema = new mongoose.Schema({
    caseId: { type: String, default: "", required: true },
    name: { type: String, default: "", required: true },
});

testFormSchema.index({ "caseId": 1 }, { unique: true })
testFormSchema.set("timestamps", true)

module.exports = TestForm = mongoDbConn.model("test_form", testFormSchema);





