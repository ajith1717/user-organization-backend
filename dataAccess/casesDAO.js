const cases = require("../models/cases")
const CardiacCases = require("../models/cardiacCases")





// function to created and update basic case form
exports.createBasicCaseFormDAO = async (updatePayload, payload) => {
    try {
        if (payload?.caseId == null) {
            delete payload.caseId
        }
        return await cases.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create or update  basic case form"
                }
            }).catch(error => {
                console.log(error)
                throw error
            })
    } catch (err) {
        console.log(err)
        throw err
    }
}


// function used create or update cardiac case form
exports.createCardiaCaseFormDAO = async (updatePayload, payload) => {
    try {
        if (payload?.caseId == null) {
            console.log(error)
            throw error
        }
        return await CardiacCases.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create or update  cardiac case form"
                }
            }).catch(error => {
                console.log(error)
                throw error
            })
    } catch (err) {
        console.log(err)
        throw err
    }
}