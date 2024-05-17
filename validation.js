const { check, query, param, validationResult, oneOf, escape, body } = require('express-validator');


// Function for validate guardian signup request
exports.validateGuardianSignup = [

    check("email").trim().not().isEmpty().withMessage({ msg: "Email address must not be empty", field: "password" }),
    check("name").trim().not().isEmpty().withMessage({ msg: "Name must not be empty", field: "name" }),
    check("email", "Invalid email address").trim().isEmail().withMessage({ msg: "Invalid email address", field: "email" }),
    check("password", "Password must not be empty").trim().not().isEmpty().withMessage({ msg: "Password must not be empty", field: "password" }),
    check("password").trim().isLength({ min: 6 }).withMessage({ msg: "Password must be more than 6 characters", field: "password" }),
    check("password").trim().not().isEmpty().isLength({ max: 20 }).withMessage({ msg: "Password must not be more than 20 characters", field: "password" }),
    check("password", "Password should be alpha numeric").trim().not().isEmpty().matches(/(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}/).withMessage({ msg: "Password should be alpha numeric", field: "password" }),
]


// Function for validate email login 
exports.validateEmailLogin = [
    check("email").trim().not().isEmpty().withMessage({ msg: "Email address must not be empty", field: "email" }),
    check("email", "Invalid email address").trim().isEmail().withMessage({ msg: "Invalid email address", field: "email" }),
    check("password", "Password must not be empty").trim().not().isEmpty().withMessage({ msg: "Password must not be empty", field: "password" }),
]


exports.validateOrganization = [
    check("name").trim().not().isEmpty().withMessage({ msg: "Name must not be empty", field: "name" }),
]
