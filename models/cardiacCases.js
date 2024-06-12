const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const cardiacCasesSchema = new mongoose.Schema({
    patientId: { type: String, default: "", required: true },
    caseId: { type: String, default: "", required: true },
    timeOfOnset: { type: Date, default: new Date() },
    timeOfMaxPain: { type: Date, default: new Date() },
    location: { type: String, default: "" },
    timing: { type: String, default: "" },
    radiation: { type: String, default: "" },
    associated: { type: String, default: "" },
    notes: { type: String, default: "" },
    riskFactors: {
        smoker: { type: Boolean, default: false },
        hypertension: { type: Boolean, default: false },
        diabetes: { type: Boolean, default: false },
        highCholesterol: { type: Boolean, default: false },
        obesity: { type: Boolean, default: false },
        heartDisease: { type: Boolean, default: false },
        cabg: { type: Boolean, default: false },
        angioplasty: { type: Boolean, default: false },
        cva: { type: Boolean, default: false },
    },
    specialMedicationHistory: {
        antiPlatelet: { type: Boolean, default: false },
        highCholesterol: { type: Boolean, default: false },
        diabetes: { type: Boolean, default: false },
        stains: { type: Boolean, default: false },
        antiHypertension: { type: Boolean, default: false },
    },
    ecg: { type: String, default: "" },
    cardiacEnzymes: { type: String, default: "" },
    others: { type: String, default: "" },


});

cardiacCasesSchema.index({ "patientId": 1, "caseId": 1 }, { unique: true })
cardiacCasesSchema.set("timestamps", true)

module.exports = CardiacCasesSchema = mongoDbConn.model("cardiacCases", cardiacCasesSchema);





