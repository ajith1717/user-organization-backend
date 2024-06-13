const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const obstetricCasesSchema = new mongoose.Schema({
    patientId: { type: String, default: "", required: true },
    caseId: { type: String, default: "", required: true },
    lmp: { type: Date, default: new Date() },
    membranes: {
        ruptured: { type: Boolean, default: false },
        intact: { type: Boolean, default: false },
        startDate: { type: Date, default: new Date() },
        startTime: { type: String, default: "" },
    },
    obstetricSummary: {
        g: { type: String, default: "" },
        p: { type: String, default: "" },
        l: { type: String, default: "" },
        a: { type: String, default: "" },
        s: { type: String, default: "" },
        d: { type: String, default: "" },
        less: { type: String, default: "" },
        ectopic: { type: String, default: "" }
    },
    plurality: { type: String, default: "" },
    edd: { type: Date, default: new Date() },
    gestationScans: {
        weeks: { type: String, default: "" },
        days: { type: String, default: "" },
    },
    gestationDates: {
        weeks: { type: String, default: "" },
        days: { type: String, default: "" },
    },
    patientBloodGroup: { type: String, default: "" },
    fetalHeartRate: { type: String, default: "" },
    twinsHeartRate: { type: String, default: "" },
    riskFactorsMaternal: {
        aph: { type: Boolean, default: false },
        pih: { type: Boolean, default: false },
        gdm: { type: Boolean, default: false },
        dm: { type: Boolean, default: false },
        htn: { type: Boolean, default: false },
        eclamspia: { type: Boolean, default: false },
        severeAnemia: { type: Boolean, default: false },
        obseity: { type: Boolean, default: false },
        smoker: { type: Boolean, default: false },
        twins: { type: Boolean, default: false },
        triplets: { type: Boolean, default: false },
        pastAbdominal: { type: Boolean, default: false },
        hiv: { type: Boolean, default: false },
        hbsag: { type: Boolean, default: false },
        vdrl: { type: Boolean, default: false },
        unbooked: { type: Boolean, default: false },
        unvaccinated: { type: Boolean, default: false },
        folicAcidMissed: { type: Boolean, default: false },
    },
    riskFactorsFetal: {
        preterm: { type: Boolean, default: false },
        msl: { type: Boolean, default: false },
        oligohydramnios: { type: Boolean, default: false },
        polyhyramnios: { type: Boolean, default: false },
        fetalAnomalies: { type: Boolean, default: false },
        notes: { type: String, default: "" },
        iugr: { type: Boolean, default: false },
        prom: { type: Boolean, default: false },
        ict: { type: Boolean, default: false },
        macrosomia: { type: Boolean, default: false },
    },
    hopi: { type: String, default: "" }
});

obstetricCasesSchema.index({ "patientId": 1, "caseId": 1 }, { unique: true })
obstetricCasesSchema.set("timestamps", true)

module.exports = ObstetricCases = mongoDbConn.model("obstetric_cases", obstetricCasesSchema);





