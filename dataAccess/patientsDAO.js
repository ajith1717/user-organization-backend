
const Users = require("../models/patients")



// function used to fetch user details by given payload 
exports.fetchUserDetailsByPayload = async (payload) => {
    return await Users.findOne(payload).lean()
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetched the user details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}


// function used to update user details by update payload
exports.createOrUpdateUserDetailsByPayload = async (updatePayload, payload) => {
    return await Users.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully create or update  User"
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}


// function used to fetch all the users 
exports.fetchAllUser = async (payload) => {
    return await Users.find().lean()
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetched the user details "
            }
        }).catch(error => {
            console.log(error)
            throw err
        })
}


// function used to fetch user details by given payload 
exports.fetchAllUserDetailsByPayload = async () => {
    const pipeline =
        [
            {
                '$lookup': {
                    'from': 'organizations',
                    'localField': 'organization',
                    'foreignField': '_id',
                    'as': 'organizations'
                }
            }, {
                '$unwind': {
                    'path': '$organizations',
                    'preserveNullAndEmptyArrays': true
                }
            }

        ]
    // return await Users.aggregate(pipeline)
    return await Users.find().lean()

        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetched the user details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}


// functions used to fetch organizations list 
exports.fetchAllOrganizationsDetails = async (payload) => {
    const pipeline =
        [
            {
                '$unwind': {
                    'path': '$users',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'users',
                    'foreignField': '_id',
                    'as': 'userDetails'
                }
            }, {
                '$unwind': {
                    'path': '$userDetails',
                    'preserveNullAndEmptyArrays': true
                }
            }
        ]
    return await Organization.aggregate(pipeline)
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetched the Organization details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}


// function used to delete users 
exports.deleteUserDetailsByPayload = async (payload) => {
    return await Users.deleteOne(payload).lean()
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully deleted the user details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}