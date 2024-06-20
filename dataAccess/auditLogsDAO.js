const AuditLog = require("../models/auditLog")



// function to created audit logs
exports.createAuditLogsFormDAO = async (payload) => {
    try {

        return await AuditLog.create(payload)
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a audit logs"
                }
            }).catch(error => {
                console.log(error)
                throw error
            })
    } catch (err) {
        console.log(err)
        throw err
    }
}

