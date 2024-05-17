const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");
const { authenticateAPI } = require("../passport");
const { validateOrganization } = require("../validation");

// API for create organizations
router.post("/v1", validateOrganization, organizationController.createOrganizations);


// API for update user details 
router.put("/v1", organizationController.updateOrganizationsDetails)

// API for sign out user 
router.delete("/v1", organizationController.deleteOrganizationsDetails)

module.exports = router;
