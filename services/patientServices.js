const { createOrUpdatePatientDetailsDAO } = require("../dataAccess/patientsDAO");




// function used to create update patients details 
exports.createOrUpdatePatientDetails = async (payload) => {
    try {
        // create or update the patient details 
        let patientDetailsData = await createOrUpdatePatientDetailsDAO({ patientId: payload?.patientId }, payload)
        return patientDetailsData
    } catch (error) {
        console.log(error)
        throw error;
    }
}

