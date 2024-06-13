const cases = require("../models/cases")
const CardiacCases = require("../models/cardiacCases")
const NeonatalCases = require("../models/neonatalCases")
const obstetricCases = require("../models/obstetricCases")
const strokeCases = require("../models/strokeCases")
const ManagementForm = require("../models/managementForm")
const followUpForm = require("../models/followUpForm")




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
                    msg: "Successfully create a basic form"
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
                    msg: "Successfully create a Cardiac form"
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



// function used create or update neonatal case form
exports.createNeonatalCaseFormDAO = async (updatePayload, payload) => {
    try {
        if (payload?.caseId == null) {
            console.log(error)
            throw error
        }
        return await NeonatalCases.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a Neonatal form"
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


// function used to create or update obstetric case form
exports.createObstetricCaseFormDAO = async (updatePayload, payload) => {
    try {
        if (payload?.caseId == null) {
            console.log(error)
            throw error
        }
        return await obstetricCases.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a Obstetric form"
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


// function used to create or edit stroke case form
exports.createStrokeCaseFormDAO = async (updatePayload, payload) => {
    try {
        if (payload?.caseId == null) {
            console.log(error)
            throw error
        }
        return await strokeCases.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a Stroke form"
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

// function used to create or update management form
exports.createManagementFormDAO = async (updatePayload, payload) => {
    try {
        return await ManagementForm.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a Management form"
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


// function used to create or update follow up form
exports.createFollowUpFormDAO = async (updatePayload, payload) => {
    try {
        return await followUpForm.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a Follow up form"
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

