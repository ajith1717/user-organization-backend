const { createBasicCaseFormDAO, createCardiaCaseFormDAO, createNeonatalCaseFormDAO, createObstetricCaseFormDAO, createStrokeCaseFormDAO, createManagementFormDAO, createFollowUpFormDAO, fetchAllBasicFormWithGivenPayload, fetchBasicCaseDetailsByCaseId, fetchCardiacCaseDetailsByCaseId, fetchNeonatalCaseDetailsByCaseId, fetchObstetricCaseDetailsByCaseId, fetchStrokeCaseDetailsByCaseId, fetchManagementFormDetailsByCaseId, fetchFollowUpFormDetailsByCaseId, fetchSummaryCaseDetailsByCaseId } = require("../dataAccess/casesDAO");
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
            await createBasicCaseFormDAO({ caseId: caseDetails?.caseId }, { specialCase: "cardiac" })
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

// function used to fetch case details using caseId
exports.getFormDetailsByCaseId = async (caseId, type, formId) => {
    try {
        // fetch basic form details using caseId
        let caseDetails
        if (type == "basic") {
            caseDetails = await fetchBasicCaseDetailsByCaseId(caseId)
        } else if (type == "cardiac") {
            caseDetails = await fetchCardiacCaseDetailsByCaseId(caseId)
        } else if (type == "neonatal") {
            caseDetails = await fetchNeonatalCaseDetailsByCaseId(caseId)
        } else if (type == "obstetric") {
            caseDetails = await fetchObstetricCaseDetailsByCaseId(caseId)
        } else if (type == "stroke") {
            caseDetails = await fetchStrokeCaseDetailsByCaseId(caseId)
        } else if (type == "management") {
            caseDetails = await fetchManagementFormDetailsByCaseId(caseId, formId)
        } else if (type == "followup") {
            caseDetails = await fetchFollowUpFormDetailsByCaseId(caseId, formId)
        }
        if (caseDetails?.success) {
            return caseDetails
        } else {
            return {
                success: false,
                msg: "Error occurred during fetching case details by case id ",
                errors: caseDetails?.errors
            }
        }


    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to fetch summary page details using caseId
exports.getSummaryPageDetailsByCaseId = async (caseId) => {
    try {
        // fetch basic form details using caseId
        let basicCaseForm = await fetchSummaryCaseDetailsByCaseId(caseId)
        if (basicCaseForm.success) {
            basicCaseForm.data = basicCaseForm.data[0]
            if (basicCaseForm.data != null) {
                basicCaseForm.data.drugALlergies = ""
                // format structure
                let caseForms = []
                caseForms.push({ type: "basic", caseId: basicCaseForm.data.caseId, date: basicCaseForm.data.createdAt })
                if (basicCaseForm.data.specialCase) {
                    if (basicCaseForm.data.specialCase == "cardiac") {
                        caseForms.push({ type: basicCaseForm.data.specialCase, caseId: basicCaseForm.data.caseId, date: basicCaseForm?.data?.cardiac_cases[0]?.createdAt })
                    } else if (basicCaseForm?.data?.specialCase == "neonatal") {
                        caseForms?.push({ type: basicCaseForm?.data?.specialCase, caseId: basicCaseForm?.data?.caseId, date: basicCaseForm?.data?.neonatal_cases[0]?.createdAt })
                    } else if (basicCaseForm?.data?.specialCase == "obstetric") {
                        caseForms?.push({ type: basicCaseForm?.data?.specialCase, caseId: basicCaseForm?.data?.caseId, date: basicCaseForm?.data?.obstetric_cases[0]?.createdAt })
                    } else if (basicCaseForm?.data?.specialCase == "stroke") {
                        caseForms?.push({ type: basicCaseForm?.data?.specialCase, caseId: basicCaseForm?.data?.caseId, date: basicCaseForm?.data?.stroke_cases[0]?.createdAt })
                    } else {
                        caseForms?.push({ type: basicCaseForm?.data?.specialCase, caseId: basicCaseForm?.data?.caseId, date: basicCaseForm?.data?.createdAt })
                    }
                }
                if (basicCaseForm?.data?.management_forms) {
                    basicCaseForm?.data?.management_forms?.forEach(form => {
                        caseForms?.push({ type: "management", caseId: basicCaseForm?.data?.caseId, formId: form?.formId, date: form?.date })
                    });
                }
                if (basicCaseForm?.data?.follow_up_forms) {
                    basicCaseForm?.data?.follow_up_forms?.forEach(form => {
                        caseForms?.push({ type: "followup", caseId: basicCaseForm?.data?.caseId, formId: form?.formId, date: form?.date })
                    });
                }
                // delete 
                delete basicCaseForm?.data?.management_forms
                delete basicCaseForm?.data?.follow_up_forms
                delete basicCaseForm?.data?.cardiac_cases
                delete basicCaseForm?.data?.neonatal_cases
                delete basicCaseForm?.data?.obstetric_cases
                delete basicCaseForm?.data?.stroke_cases

                basicCaseForm.data.caseForms = caseForms
            }

            return basicCaseForm
        } else {
            return {
                success: false,
                msg: "Error occurred during fetching summary details",
                errors: basicCaseForm.errors
            }
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
}