const { validationResult } = require("express-validator");
const { HTTP_STATUS_CODE } = require("../constant/general");
const { userSignup, userLogin, fetchUserDetails, updateUserDetails, fetchAllUserDetails, updateUserImage, deleteUserDetails, fetchAllOrganizationsDetails } = require("../services/patientServices");


// API for user signup
exports.userSignup = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (errors.errors.length > 0) {
            throw (errors)
        }
        let result = await userSignup(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during Signup", errors: err }))
    }
}


// API for user userLogin
exports.userLogin = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (errors.errors.length > 0) {
            throw (errors)

        }
        let result = await userLogin(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during login", errors: err }))
    }
}


// API for fetch user details 

exports.fetchUserDetails = async (req, res) => {
    try {
        let email = req.user.email
        let result = await fetchUserDetails(email);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during login", errors: err }))
    }
}


// function used to update user details 
exports.updateUserDetails = async (req, res) => {
    try {
        let result = await updateUserDetails(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during login", errors: err }))
    }
}


// function used to fetch all user details 
exports.fetchAllUserDetails = async (req, res) => {
    try {
        // let userRole = req.user.userRole
        let result = await fetchAllUserDetails();
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during login", errors: err }))
    }
}

// function used to fetch organization list 
exports.fetchAllOrganizationsDetails = async (req, res) => {
    try {
        let result = await fetchAllOrganizationsDetails();
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during login", errors: err }))
    }
}



// function used to update user details 
exports.updateUserImage = async (req, res) => {
    try {
        let result = await updateUserImage(req.body, req.files);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during login", errors: err }))
    }
}


// function used to delete user details 
exports.deleteUserDetails = async (req, res) => {
    try {
        let _id = req.query._id
        let result = await deleteUserDetails(_id);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during login", errors: err }))
    }
}
