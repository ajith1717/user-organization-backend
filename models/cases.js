const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const caseSchema = new mongoose.Schema({
    // random 6 digit alpha number
    caseId: { type: String, required: true, unique: true },
    patientId: { type: String, default: "", required: true },
    primaryDoctorName: { type: String, default: "", required: true },
    primaryDoctorCode: { type: String, default: "", required: true },
    bedNumber: { type: String, default: "", required: true },

    arrivalDate: { type: Date, default: new Date(), required: true },
    preHospitalAssessment: { type: String, default: "" },// alert / verbal / painful / unconscious
    condition: { type: String, default: "" }, // alert / verbal / painful / unconscious
    mode: {
        source: { type: String, default: "" }, // ambulatory/self  / police  / paramedic / witness
        badge: { type: String, default: "" }, // police badge number
    },
    weight: {
        value: { type: Number, default: 0 },
        measured: { type: Boolean, default: true }
    },
    height: {
        value: { type: Number, default: 0 },
        measured: { type: Boolean, default: true }
    },
    arrivalVitalSigns: {
        pulse: { type: Number, default: 0 },
        bp: { type: String, default: "" },
        o2: { type: String, default: "" },
        rr: { type: Number, default: 0 },
        spo2: { type: Number, default: 0 },
        temp: { type: Number, default: 0 },
        gcs: { type: Number, default: 0 },
        painScore: { type: Number, default: 0 },
    },
    complaints: { type: [], default: [] },
    hopi: { type: String, default: "" },
    pastHistory: { type: String, default: "" },
    familyHistory: { type: String, default: "" },
    medicationHistory: { type: [String], default: [] },
    gpe: { type: String, default: "" },
    primarySystem: { type: String, default: "" },
    otherSystem: { type: String, default: "" },

    vitalSigns: {
        pulse: { type: Number, default: 0 },
        bp: { type: String, default: "" },
        o2: { type: String, default: "" },
        rr: { type: Number, default: 0 },
        spo2: { type: Number, default: 0 },
        temp: { type: Number, default: 0 },
        gcs: { type: Number, default: 0 },
        painScore: { type: Number, default: 0 },
    },
    workingDiagnosis: { type: [String], default: [] },
    urgentCare: { type: [String], default: [] },
    investigations: { type: [String], default: [] },
    specialistReferrals: { type: [String], default: [] },
    treatments: { type: String, default: "" },
    diagnosis: {
        finalDiagnosis: { type: [String], default: [] },
        admission: { type: Boolean, default: false },
        discharge: { type: Boolean, default: false },
        referral: { type: Boolean, default: false },
        discharge: { type: Boolean, default: false },
    },
    prescription: { type: String, default: "" },
    followUp: { type: String, default: "" },
    returnToEr: { type: String, default: "" },

});

caseSchema.index({ "patientId": 1, "caseId": 1 }, { unique: true })
caseSchema.set("timestamps", true)

module.exports = Cases = mongoDbConn.model("cases", caseSchema);





