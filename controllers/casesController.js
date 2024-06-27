const { HTTP_STATUS_CODE } = require("../constant/general");
const { createBasicCaseForm, updateBasicCaseForm, createCardiacCaseForm, updateCardiacCaseForm, createNeonatalCaseForm, createObstetricCaseForm, createStrokeCaseForm, createManagementForm, createFollowUpForm, getAllForms, getFormDetailsByCaseId, getSummaryPageDetailsByCaseId, createTestForm } = require("../services/caseServices");





// API for creating basic case form 
exports.createBasicCaseForm = async (req, res) => {
    try {

        let result = await createBasicCaseForm(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during creating basic case form ", errors: err }))
    }
}


// function used to update basic case form
exports.updateBasicCaseForm = async (req, res) => {
    try {
        let result = await createBasicCaseForm(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during updating basic case form ", errors: err }))
    }
}

// function used to update basic case form
exports.getBasicCaseForm = async (req, res) => {
    try {
        // let result = await updateBasicCaseForm(req.body);
        let result = {
            success: true,
            msg: "fetched successfully"
        }
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during updating basic case form ", errors: err }))
    }
}



// function used to create cardiac case form
exports.createCardiacCaseForm = async (req, res) => {
    try {
        let result = await createCardiacCaseForm(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during creating cardiac case form ", errors: err }))
    }
}



// function used to update Cardiac case form
exports.updateCardiacCaseForm = async (req, res) => {
    try {
        let result = await updateCardiacCaseForm(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during updating Cardiac case form ", errors: err }))
    }
}

// function used to create or update neonatal case form
exports.createNeonatalCaseForm = async (req, res) => {
    try {
        let result = await createNeonatalCaseForm(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during creating neonatal case form ", errors: err }))
    }
}


// function used to create or update obstetric case form
exports.createObstetricCaseForm = async (req, res) => {
    try {
        let result = await createObstetricCaseForm(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during creating obstetric case form ", errors: err }))
    }
}


// function used to create or update stroke case form
exports.createStrokeCaseForm = async (req, res) => {
    try {
        let result = await createStrokeCaseForm(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during creating stroke case form ", errors: err }))
    }
}

// function used to create or update management form
exports.createManagementForm = async (req, res) => {
    try {
        let result = await createManagementForm(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during creating management form ", errors: err }))
    }
}

// function used to create or update follow up form
exports.createFollowUpForm = async (req, res) => {
    try {
        let result = await createFollowUpForm(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during creating follow up form ", errors: err }))
    }
}


// function used to fetch all forms 
exports.getAllForms = async (req, res) => {
    try {

        let result = await getAllForms(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during fetching all forms ", errors: err }))
    }
}


// function used to fetch form details using caseId
exports.getFormDetails = async (req, res) => {
    try {
        const caseId = req.params.caseId
        const type = req.query.type
        const formId = req.query.formId
        let result = await getFormDetailsByCaseId(caseId, type, formId);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during fetching form details using caseId", errors: err }))
    }


}


// Function used to fetch summary page details using caseId
exports.getSummaryDetails = async (req, res) => {
    try {
        const caseId = req.params.caseId
        console.log(caseId, "asdasdasdasd")

        let result = await getSummaryPageDetailsByCaseId(caseId);

        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during fetching summary page details using caseId", errors: err }))
    }
}


// function used to create test form 
exports.createTestForm = async (req, res) => {
    try {
        let result = await createTestForm(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during creating test form ", errors: err }))
    }
}