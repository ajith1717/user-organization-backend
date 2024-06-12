const express = require("express");
const router = express.Router();
const caseController = require("../controllers/casesController");
const { authenticateAPI } = require("../passport");


// API for case form
router.post("/v1", caseController.createBasicCaseForm);

// API for update case form
router.put("/v1", caseController.updateBasicCaseForm);

// API for get case form
router.get("/v1", caseController.getBasicCaseForm);


module.exports = router;
