const { HTTP_STATUS_CODE } = require("../constant/general");
const { createBasicCaseForm, updateBasicCaseForm } = require("../services/caseServices");





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
        let result = await updateBasicCaseForm(req.body);
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