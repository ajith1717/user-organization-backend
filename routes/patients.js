const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientsControllers");
const { authenticateAPI } = require("../passport");

const fs = require('fs');

const multer = require("multer");
const path = require("path");
const { validateGuardianSignup, validateEmailLogin } = require("../validation");

// Configure Multer to store uploaded files in the 'public' directory
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, uploadDirectory);
        cb(null, path.join(__dirname, '../public'))
    },
    filename: (req, file, cb) => {
        // Generate a unique filename by adding a timestamp
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.originalname}`;
        cb(null, Date.now() + path.extname(file.originalname))
    },
});

const imageUpload = multer({ storage: imageStorage })

// API for sign up
router.post("/v1/user", validateGuardianSignup, patientController.userSignup);


// API for login 
router.post("/v1/login", validateEmailLogin, patientController.userLogin)

// API for fetch user details 
router.get("/v1/user", [authenticateAPI], patientController.fetchUserDetails)

// API for update user details 
router.put("/v1/user", [authenticateAPI], patientController.updateUserDetails)


// // API for upload image 
// router.patch("/v1/image", imageUpload.any(), [authenticateAPI], patientController.updateUserImage)


// API for fetch all user details 
router.get("/v1/users", [authenticateAPI], patientController.fetchAllUserDetails)


// API for fetch all organizations details 
router.get("/v1/organizations", [authenticateAPI], patientController.fetchAllOrganizationsDetails)
// API for sign out user 

router.delete("/v1/user", [authenticateAPI], patientController.deleteUserDetails)

module.exports = router;
