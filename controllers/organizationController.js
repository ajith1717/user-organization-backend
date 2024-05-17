const { validationResult } = require("express-validator");
const { HTTP_STATUS_CODE } = require("../constant/general");
const { createOrganizations, updateOrganizationsDetails, deleteOrganizationsDetails, } = require("../services/organizationServices");


// API for user signup
exports.createOrganizations = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (errors.errors.length > 0) {
            throw (errors)
        }
        let result = await createOrganizations(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during creating organizations", errors: err }))
    }
}





// function used to update Organizations details 
exports.updateOrganizationsDetails = async (req, res) => {
    try {
        let result = await updateOrganizationsDetails(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during updating organizations", errors: err }))
    }
}






// function used to delete Organizations details 
exports.deleteOrganizationsDetails = async (req, res) => {
    try {
        let _id = req.query._id
        let result = await deleteOrganizationsDetails(_id);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during delete organizations", errors: err }))
    }
}
