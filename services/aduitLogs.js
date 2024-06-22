const { createAuditLogsFormDAO } = require("../dataAccess/auditLogsDAO");
const { compareObjects, formatChanges } = require("./compare");



//function used to create aduit log 
exports.createAuditLog = async (payload) => {
    try {
        let result = await createAuditLogsFormDAO(payload);
        return result
    } catch (err) {
        console.log('err', err)
        return ({ success: false, msg: "Error occurred during creating audit log ", errors: err })
    }
}


// function used to fetch the changes data for audit logs
exports.fetchAuditChangesData = (newData, oldData) => {
    // let changes = {};
    // // get keys from new data
    // let updatedKeys = Object.keys(newData);
    // // loop through the keys
    // updatedKeys.forEach(key => {
    //     // avoid caseId , patient details and staff details
    //     if (key === "caseId" || key === "patientDetails" || key === "staffId" || key == "patientId") {
    //         return
    //     }
    //     // check if the key is present in old data
    //     if (oldData[key] !== null) {
    //         changes[key] = {
    //             old: oldData[key],
    //             new: newData[key]
    //         }
    //     } else {
    //         changes[key] = {
    //             old: null,
    //             new: newData[key]
    //         }
    //     }
    // })
    let changes = {}
    return compareObjects(oldData, newData, changes)
    // return changes
}

