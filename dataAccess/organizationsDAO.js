
const Organizations = require("../models/organization")


// function used to fetch Organizations details by given payload 
exports.fetchOrganizationsDetailsByPayload = async (payload) => {
    return await Organizations.findOne(payload).lean()
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetched the Organizations details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}
// function used to update Organizations details by update payload
exports.createOrganizationsDetailsByPayload = async (payload) => {
    return await Organizations.create(payload)
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully create or update  Organizations"
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}



// function used to update Organizations details by update payload
exports.createOrUpdateOrganizationsDetailsByPayload = async (updatePayload, payload) => {
    return await Organizations.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully create or update  Organizations"
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}


// function used to fetch all the Organizations 
exports.fetchAllOrganizations = async (payload) => {
    return await Organizations.find().lean()
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetched the Organizations details "
            }
        }).catch(error => {
            console.log(error)
            throw err
        })
}


// function used to fetch Organizations details by given payload 
exports.fetchAllOrganizationsDetailsByPayload = async (OrganizationsType) => {
    const pipeline = [{
        '$match': {
            'OrganizationsType': {
                '$in': OrganizationsType
            }
        }
    }
    ]
    return await Organizations.aggregate(pipeline)
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetched the Organizations details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}


// function used to delete Organizations 
exports.deleteOrganizationsDetailsByPayload = async (payload) => {
    return await Organizations.deleteOne(payload).lean()
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully deleted the Organizations details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}