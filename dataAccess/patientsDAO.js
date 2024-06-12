
const Patients = require("../models/patients")





// function used to update user details by update payload
exports.createOrUpdatePatientDetailsDAO = async (updatePayload, payload) => {
    return await Patients.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully create or update  Patients details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}

