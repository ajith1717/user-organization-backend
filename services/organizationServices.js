const { createOrUpdateOrganizationsDetailsByPayload, createOrganizationsDetailsByPayload, deleteOrganizationsDetailsByPayload } = require("../dataAccess/organizationsDAO");
const { createOrUpdateUserDetailsByPayload } = require("../dataAccess/userDAO");



// function used to create createOrganizations
exports.createOrganizations = async (payload) => {
    try {
        let createOrganizations
        if (payload._id != null) {
            payload.users = payload.users.map((user) => { return user._id })
            createOrganizations = await createOrUpdateOrganizationsDetailsByPayload({ _id: payload._id }, payload);
        } else {
            if (payload.users?.length > 0) {
                payload.users = payload.users.map((user) => { return user._id })
            }
            createOrganizations = await createOrganizationsDetailsByPayload(payload);
        }

        if (createOrganizations.success) {
            return createOrganizations
        } else {
            return createOrganizations
        }
    } catch (err) {
        console.log('err', err)
        return { success: false, msg: "Error occurred during creating organizations", errors: err }
    }
}

// function used to update organization details 
exports.updateOrganizationsDetails = async (payload) => {
    try {
        let updateOrganizations = await createOrUpdateOrganizationsDetailsByPayload({ _id: payload._id }, payload);
        return updateOrganizations
    } catch (err) {
        console.log('err', err)
        return { success: false, msg: "Error occurred during updating organizations", errors: err }
    }
}


// function used to delete organization details 
exports.deleteOrganizationsDetails = async (_id) => {
    try {
        let deleteOrganizations = await deleteOrganizationsDetailsByPayload({ _id });
        return deleteOrganizations
    } catch (err) {
        console.log('err', err)
        return { success: false, msg: "Error occurred during delete organizations", errors: err }
    }
}