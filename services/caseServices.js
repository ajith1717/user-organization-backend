const { createBasicCaseFormDAO, createCardiaCaseFormDAO, createNeonatalCaseFormDAO, createObstetricCaseFormDAO, createStrokeCaseFormDAO, createManagementFormDAO, createFollowUpFormDAO } = require("../dataAccess/casesDAO");
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