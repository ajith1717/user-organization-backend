const mongoose = require('mongoose');
// import mongo db connection 
const { mongoDbConn } = require("../mongo")

const neonatalCasesSchema = new mongoose.Schema({
    patientId: { type: String, default: "", required: true },
    caseId: { type: String, default: "", required: true },
    date: { type: Date, default: new Date() },
    time: { type: String, default: "" },
    birthWeight: { type: Number, default: 0 },
    modeOfDelivery: { type: String, default: "" },
    indication: { type: String, default: "" },
    gestation: { type: String, default: "" },
    apgar: { type: String, default: "" },
    antenatalSteroid: { type: String, default: "" },
    maternalBloodGroup: { type: String, default: "" },
    babyBloodGroup: { type: String, default: "" },
    babyG6PD: { type: String, default: "" },
    resuscitation: { type: String, default: "" },
    feeding: { type: String, default: "" },

    // feeding: {
    //     breast: { type: Boolean, default: false },
    //     formula: { type: Boolean, default: false },
    //     notes: { type: String, default: "" },
    // },
    hopi: { type: String, default: "" },


});

neonatalCasesSchema.index({ "patientId": 1, "caseId": 1 }, { unique: true })
neonatalCasesSchema.set("timestamps", true)

module.exports = NeonatalCasesSchema = mongoDbConn.model("neonatal_cases", neonatalCasesSchema);





