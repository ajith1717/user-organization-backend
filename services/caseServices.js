const { createBasicCaseFormDAO } = require("../dataAccess/casesDAO");



// function used to create basic case details 
exports.createBasicCaseForm = async (caseDetails) => {
    try {
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