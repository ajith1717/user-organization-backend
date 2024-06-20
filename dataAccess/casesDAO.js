const cases = require("../models/cases")
const CardiacCases = require("../models/cardiacCases")
const NeonatalCases = require("../models/neonatalCases")
const obstetricCases = require("../models/obstetricCases")
const strokeCases = require("../models/strokeCases")
const ManagementForm = require("../models/managementForm")
const followUpForm = require("../models/followUpForm")
const managementForm = require("../models/managementForm")




// function to created and update basic case form
exports.createBasicCaseFormDAO = async (updatePayload, payload) => {
    try {
        if (payload?.caseId == null) {
            delete payload.caseId
        }
        return await cases.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a basic form"
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


// function used create or update cardiac case form
exports.createCardiaCaseFormDAO = async (updatePayload, payload) => {
    try {
        if (payload?.caseId == null) {
            console.log(error)
            throw error
        }
        return await CardiacCases.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a Cardiac form"
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



// function used create or update neonatal case form
exports.createNeonatalCaseFormDAO = async (updatePayload, payload) => {
    try {
        if (payload?.caseId == null) {
            console.log(error)
            throw error
        }
        return await NeonatalCases.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a Neonatal form"
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


// function used to create or update obstetric case form
exports.createObstetricCaseFormDAO = async (updatePayload, payload) => {
    try {
        if (payload?.caseId == null) {
            console.log(error)
            throw error
        }
        return await obstetricCases.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a Obstetric form"
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


// function used to create or edit stroke case form
exports.createStrokeCaseFormDAO = async (updatePayload, payload) => {
    try {
        if (payload?.caseId == null) {
            console.log(error)
            throw error
        }
        return await strokeCases.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a Stroke form"
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

// function used to create or update management form
exports.createManagementFormDAO = async (updatePayload, payload) => {
    try {
        return await ManagementForm.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a Management form"
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


// function used to create or update follow up form
exports.createFollowUpFormDAO = async (updatePayload, payload) => {
    try {
        return await followUpForm.findOneAndUpdate(updatePayload, payload, { upsert: true, new: true }).lean()
            .then(result => {
                return {
                    success: true,
                    data: result,
                    msg: "Successfully create a Follow up form"
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


// function used to fetch all forms with special case filter , page , size and search query 
// need aggregation to filter out the data
exports.fetchAllBasicFormWithGivenPayload = async (payload) => {
    // specialCase filter 
    // pagination 
    // search query for primaryDoctorName
    let skip = 10
    const pipeline = [

        {
            $skip: payload.page * skip
        },
        {
            $limit: skip
        },
        {
            $lookup: {
                from: "patients",
                localField: "patientId",
                foreignField: "patientId",
                as: "patientDetails"
            }
        },
        {
            $unwind: {
                path: "$patientDetails"
            }
        }
    ]
    if (payload.searchQuery != null && payload.searchQuery != "") {
        pipeline.push({
            $match: {
                $or: [
                    { caseId: { $regex: payload.searchQuery, $options: "i" } },
                    { name: { $regex: payload.searchQuery, $options: "i" } },
                    { primaryDoctorName: { $regex: payload.searchQuery, $options: "i" } },
                    { complaints: { $regex: payload.searchQuery, $options: "i" } },
                    { specialCase: { $regex: payload.searchQuery, $options: "i" } },
                ]
            }
        })
    }
    if (payload.type != "" && payload.type != null) {
        pipeline.push({
            $match: {
                specialCase: payload.type
            }
        })
    }
    pipeline.push({
        '$project': {
            'patientId': 1,
            'caseId': 1,
            'patient': 'patientDetails.name',
            'arrivalDate': 1,
            'primaryDoctorCode': 1,
            'primaryDoctorName': 1,
            'specialCase': 1
        }
    })
    return cases.aggregate(pipeline)
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching cases list`, err)
            throw err;
        })
}


// function used to fetch basic case Details by case Id
exports.fetchBasicCaseDetailsByCaseId = async (caseId) => {
    return cases.findOne({ caseId: caseId }).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching basic cases list`, err)
            throw err;
        })
}



// function used to fetch basic case Details by case Id
exports.fetchBasicCaseDetailsByCaseIdByProperty = async (caseId, propertyArray) => {
    return cases.findOne({ caseId: caseId }).select(propertyArray).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching basic cases list`, err)
            throw err;
        })
}

// function used to fetch cardiac case details by caseId
exports.fetchCardiacCaseDetailsByCaseId = async (caseId) => {
    return CardiacCases.findOne({ caseId: caseId }).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching cardiac cases list`, err)
            throw err;
        })
}


// function used to fetch cardiac case details by caseId
exports.fetchCardiacCaseDetailsByCaseIdAndPropertyArray = async (caseId, propertyArray) => {
    return CardiacCases.findOne({ caseId: caseId }).select(propertyArray).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching cardiac cases list`, err)
            throw err;
        })
}

// function used to fetch neonatal case details by caseId and propertyArray
exports.fetchNeonatalCaseDetailsByCaseIdAndPropertyArray = async (caseId, propertyArray) => {
    return NeonatalCases.findOne({ caseId: caseId }).select(propertyArray).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching neonatal cases list`, err)
            throw err;
        })
}


// function used to fetch obstetric case details by caseId and propertyArray
exports.fetchObstetricCaseDetailsByCaseIdAndPropertyArray = async (caseId, propertyArray) => {
    return obstetricCases.findOne({ caseId: caseId }).select(propertyArray).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching obstetric cases list`, err)
            throw err;
        })
}

// function used to fetch stroke case details by caseId and propertyArray
exports.fetchStrokeCaseDetailsByCaseIdAndPropertyArray = async (caseId, propertyArray) => {
    return strokeCases.findOne({ caseId: caseId }).select(propertyArray).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching stroke cases list`, err)
            throw err;
        })
}


// function used to fetch management form details by caseId and propertyArray
exports.fetchManagementFormDetailsByCaseIdAndPropertyArray = async (caseId, formId, propertyArray) => {
    return managementForm.findOne({ caseId: caseId, formId: formId }).select(propertyArray).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching management form `, err)
            throw err;
        })
}

// function used to fetch follow up form details by caseId and propertyArray
exports.fetchFollowUpFormDetailsByCaseIdAndPropertyArray = async (caseId, formId, propertyArray) => {
    return followUpForm.findOne({ caseId: caseId, formId: formId }).select(propertyArray).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching follow up form `, err)
            throw err;
        })
}

// function used to fetch neonatal case details by caseId
exports.fetchNeonatalCaseDetailsByCaseId = async (caseId) => {
    return NeonatalCases.findOne({ caseId: caseId }).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching neonatal cases list`, err)
            throw err;
        })
}

// function used to fetch obstetric case details by caseId
exports.fetchObstetricCaseDetailsByCaseId = async (caseId) => {
    return obstetricCases.findOne({ caseId: caseId }).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching obstetric cases list`, err)
            throw err;
        })
}

// function used to fetch stroke case details by caseId
exports.fetchStrokeCaseDetailsByCaseId = async (caseId) => {
    return strokeCases.findOne({ caseId: caseId }).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching stroke cases list`, err)
            throw err;
        })
}


// function used to fetch management form details by caseId, formId
exports.fetchManagementFormDetailsByCaseId = async (caseId, formId) => {
    return managementForm.findOne({ caseId: caseId, formId: formId }).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching management form `, err)
            throw err;
        })
}

// function used to fetch follow up form details by caseId, formId
exports.fetchFollowUpFormDetailsByCaseId = async (caseId, formId) => {
    return followUpForm.findOne({ caseId: caseId, formId: formId }).lean()
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching follow up form `, err)
            throw err;
        })
}


exports.fetchSummaryCaseDetailsByCaseId = async (caseId) => {
    const pipeline = [
        {
            '$match': {
                'caseId': caseId
            }
        }, {
            '$lookup': {
                'from': 'patients',
                'localField': 'patientId',
                'foreignField': 'patientId',
                'as': 'patientDetails'
            }
        }, {
            '$unwind': {
                'path': '$patientDetails'
            }
        }, {
            '$lookup': {
                'from': 'follow_ups',
                'localField': 'caseId',
                'foreignField': 'caseId',
                'as': 'follow_up_forms'
            }
        }, {
            '$lookup': {
                'from': 'management_forms',
                'localField': 'caseId',
                'foreignField': 'caseId',
                'as': 'management_forms'
            }
        },
        {
            '$lookup': {
                'from': 'cardiac_cases',
                'localField': 'caseId',
                'foreignField': 'caseId',
                'as': 'cardiac_cases'
            }
        },

        {
            '$lookup': {
                'from': 'stroke_cases',
                'localField': 'caseId',
                'foreignField': 'caseId',
                'as': 'stroke_cases'
            }
        },

        {
            '$lookup': {
                'from': 'neonatal_cases',
                'localField': 'caseId',
                'foreignField': 'caseId',
                'as': 'neonatal_cases'
            }
        },

        {
            '$lookup': {
                'from': 'obstetric_cases',
                'localField': 'caseId',
                'foreignField': 'caseId',
                'as': 'obstetric_cases'
            }
        },

        , {
            '$project': {
                _id: 0,
                caseId: 1,
                arrivalDate: 1,
                createdAt: 1,
                patientId: 1,
                primaryDoctorCode: 1,
                primaryDoctorName: 1,
                specialCase: 1,
                patientDetails: 1,
                follow_up_forms: 1,
                management_forms: 1,
                cardiac_cases: 1,
                stroke_cases: 1,
                neonatal_cases: 1,
                obstetric_cases: 1,


            }
        }
    ]

    const pipeline1 = [
        {
            '$match': {
                'caseId': caseId
            }
        }, {
            '$lookup': {
                'from': 'patients',
                'localField': 'patientId',
                'foreignField': 'patientId',
                'as': 'patientDetails'
            }
        }, {
            '$unwind': {
                'path': '$patientDetails'
            }
        }, {
            '$lookup': {
                'from': 'follow_ups',
                'localField': 'caseId',
                'foreignField': 'caseId',
                'as': 'follow_up_forms'
            }
        }, {
            '$lookup': {
                'from': 'management_forms',
                'localField': 'caseId',
                'foreignField': 'caseId',
                'as': 'management_forms'
            }
        }, {
            '$lookup': {
                'from': 'cardiac_cases',
                'localField': 'caseId',
                'foreignField': 'caseId',
                'as': 'cardiac_cases'
            }
        }, {
            '$lookup': {
                'from': 'stroke_cases',
                'localField': 'caseId',
                'foreignField': 'caseId',
                'as': 'stroke_cases'
            }
        }, {
            '$lookup': {
                'from': 'neonatal_cases',
                'localField': 'caseId',
                'foreignField': 'caseId',
                'as': 'neonatal_cases'
            }
        }, {
            '$lookup': {
                'from': 'obstetric_cases',
                'localField': 'caseId',
                'foreignField': 'caseId',
                'as': 'obstetric_cases'
            }
        }, {
            '$project': {
                '_id': 0,
                'caseId': 1,
                'arrivalDate': 1,
                'createdAt': 1,
                'patientId': 1,
                'primaryDoctorCode': 1,
                'primaryDoctorName': 1,
                'specialCase': 1,
                'patientDetails': 1,
                'follow_up_forms': 1,
                'management_forms': 1,
                'cardiac_cases': 1,
                'stroke_cases': 1,
                'neonatal_cases': 1,
                'obstetric_cases': 1
            }
        }
    ]
    return cases.aggregate(pipeline1)
        .then(result => {
            return {
                success: true,
                data: result
            }
        }).catch(err => {
            console.log(`error occurred during fetching cases list`, err)
            throw err;
        })
}