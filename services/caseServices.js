const { createBasicCaseFormDAO, createCardiaCaseFormDAO, createNeonatalCaseFormDAO, createObstetricCaseFormDAO, createStrokeCaseFormDAO, createManagementFormDAO, createFollowUpFormDAO, fetchAllBasicFormWithGivenPayload } = require("../dataAccess/casesDAO");
const { createOrUpdatePatientDetails } = require("./patientServices");



// function used to create basic case details 
exports.createBasicCaseForm = async (caseDetails) => {
    try {
        // create or update the patient details 
        await createOrUpdatePatientDetails(caseDetails?.patientDetails)
        caseDetails.caseId = Math.random().toString(36).substring(2, 8).toUpperCase()
        let caseDetailsData = await createBasicCaseFormDAO({ caseId: caseDetails?.caseId }, caseDetails)
        return caseDetailsData
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to update basic case details
exports.updateBasicCaseForm = async (caseDetails) => {
    try {
        let caseDetailsData = await createBasicCaseFormDAO({ caseId: caseDetails?.caseId }, caseDetails)
        return caseDetailsData
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to create cardiac case form
exports.createCardiacCaseForm = async (caseDetails) => {
    try {
        let caseDetailsData = await createCardiaCaseFormDAO({ caseId: caseDetails?.caseId }, caseDetails)
        if (caseDetailsData.success) {
            // update isSpecialCase to true
            await createBasicCaseFormDAO({ caseId: caseDetails?.caseId }, { isSpecialCase: true })
        }
        return caseDetailsData
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to update Cardiac case details
exports.updateCardiacCaseForm = async (caseDetails) => {
    try {
        let caseDetailsData = await createCardiaCaseFormDAO({ caseId: caseDetails?.caseId }, caseDetails)
        if (caseDetailsData.success) {
            // update isSpecialCase to true
            await createBasicCaseFormDAO({ caseId: caseDetails?.caseId }, { specialCase: "cardiac" })
        }
        return caseDetailsData
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to create neonatal case form
exports.createNeonatalCaseForm = async (caseDetails) => {
    try {
        let caseDetailsData = await createNeonatalCaseFormDAO({ caseId: caseDetails?.caseId }, caseDetails)
        if (caseDetailsData.success) {
            // update isSpecialCase to true
            await createBasicCaseFormDAO({ caseId: caseDetails?.caseId }, { specialCase: "neonatal" })
        }
        return caseDetailsData
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to create or update obstetric case form
exports.createObstetricCaseForm = async (caseDetails) => {
    try {
        let caseDetailsData = await createObstetricCaseFormDAO({ caseId: caseDetails?.caseId }, caseDetails)
        if (caseDetailsData.success) {
            // update isSpecialCase to true
            await createBasicCaseFormDAO({ caseId: caseDetails?.caseId }, { specialCase: "obstetric" })
        }
        return caseDetailsData
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to create or update stroke case form
exports.createStrokeCaseForm = async (caseDetails) => {
    try {
        let caseDetailsData = await createStrokeCaseFormDAO({ caseId: caseDetails?.caseId }, caseDetails)
        if (caseDetailsData.success) {
            // update isSpecialCase to true
            await createBasicCaseFormDAO({ caseId: caseDetails?.caseId }, { specialCase: "stroke" })
        }
        return caseDetailsData
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to create or update management form
exports.createManagementForm = async (caseDetails) => {
    try {
        // create random formId 
        if (caseDetails?.formId == null) {
            caseDetails.formId = Math.random().toString(36).substring(2, 8).toUpperCase()
        }
        let caseDetailsData = await createManagementFormDAO({ caseId: caseDetails?.caseId, formId: caseDetails?.formId }, caseDetails)
        return caseDetailsData
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to create or update follow up form
exports.createFollowUpForm = async (caseDetails) => {
    try {
        // create random formId 
        if (caseDetails?.formId == null) {
            caseDetails.formId = Math.random().toString(36).substring(2, 8).toUpperCase()
        }
        let caseDetailsData = await createFollowUpFormDAO({ caseId: caseDetails?.caseId, formId: caseDetails?.formId }, caseDetails)
        return caseDetailsData
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// Function used to fetch all forms using given payload
exports.getAllForms = async (payload) => {
    try {
        // 
        // fetch all basic case form 
        let basicCaseForm = await fetchAllBasicFormWithGivenPayload(payload)
        if (basicCaseForm.success) {
            return basicCaseForm
        } else {
            return {
                success: false,
                msg: "Error occurred during fetching all forms",
                errors: basicCaseForm.errors
            }
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
}