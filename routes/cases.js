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
router.get("/", (req, res) => {
    res.send("Cases route");
});

// API for create or update cardiac case form
router.post("/v1/cardiac", caseController.createCardiacCaseForm);

// API for create or update neonatal case form
router.post("/v1/neonatal", caseController.createNeonatalCaseForm);

// API for create or update obstetric case form
router.post("/v1/obstetric", caseController.createObstetricCaseForm);

// API for create or stroke case form 
router.post("/v1/stroke", caseController.createStrokeCaseForm);

module.exports = router;
