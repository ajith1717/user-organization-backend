const { HTTP_STATUS_CODE } = require("../constant/general");
const { fetchUserDetailsByPayload, createOrUpdateUserDetailsByPayload, fetchAllUserDetailsByPayload, deleteUserDetailsByPayload, fetchAllOrganizationsDetails } = require("../dataAccess/patientsDAO");
const { generateBcryptPassword, bcryptPasswordMatch } = require("../encryption");
const { signJWTToken } = require("../utils");




// function used to sign up users
exports.userSignup = async (payload) => {
    try {
        // check user is already exist in our table 
        // if exist return 
        // else save the user details and return it 

        // find user details by given payload 
        let userDetails = await fetchUserDetailsByPayload({ email: payload.email })
        if (userDetails.success) {
            if (userDetails.data != null) {
                // user data exist with same email id 
                return {
                    success: false,
                    msg: "User already exist with this email",
                    errorCode: HTTP_STATUS_CODE.CREATED
                }
            } else {
                // hash password
                // encrypt the password with bcrypt 
                let encPassword = await generateBcryptPassword(payload.password);
                payload.password = encPassword

                // save the user details in db
                let saveUserDetails = await createOrUpdateUserDetailsByPayload({ email: payload.email }, payload)
                if (saveUserDetails.success) {
                    // create token and return
                    payload._id = saveUserDetails?.data?._id
                    // generate token and return
                    let jwtToken = await signJWTToken(payload)
                    saveUserDetails.data.token = jwtToken

                    return {
                        success: true,
                        data: saveUserDetails.data,
                        msg: "User created successfully"
                    }
                }
                else {
                    return {
                        success: false,
                        msg: "Error occurred during user creation",
                        errorCode: HTTP_STATUS_CODE.CONFLICT
                    }
                }
            }


        } else {
            return userDetails
        }

    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to check user login 
exports.userLogin = async (payload) => {
    try {
        // check user exist in our db
        // if not return 
        // if exist then check password match 
        // create token and return it 
        // find user details by given payload 
        let userDetails = await fetchUserDetailsByPayload({ email: payload.email })
        if (userDetails.success) {
            if (userDetails.data == null) {
                // return user not exist 
                return {
                    success: false,
                    msg: "User not exist with this email",
                    errorCode: HTTP_STATUS_CODE.CONFLICT
                }
            } else {
                // check pass word match 
                // match entered password with password on db.
                let passwordMatch = await bcryptPasswordMatch(payload.password, userDetails.data ? userDetails.data.password : userDetails.password);
                if (passwordMatch) {
                    // generate token and return 
                    // find all children with the family id
                    const result = {
                        _id: userDetails.data._id,
                        name: userDetails.data.name,
                        email: userDetails.data.email,
                        phone: userDetails.data.phone,
                        userType: userDetails.data.userType,
                        userRole: userDetails.data.userRole
                    }
                    let jwtToken = await signJWTToken(result)
                    result.token = jwtToken
                    return {
                        success: true,
                        data: result,
                        msg: "User login successfully"
                    }

                } else {
                    return {
                        success: false,
                        msg: "password doesn't match",
                        errorCode: HTTP_STATUS_CODE.CONFLICT
                    }
                }


            }
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to fetch user details with email
exports.fetchUserDetails = async (email) => {
    try {
        // fetch user details with email
        let userDetails = await fetchUserDetailsByPayload({ email: email })
        return userDetails
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to update user details 
exports.updateUserDetails = async (payload) => {
    try {
        // payload contains email 
        // check the email already exist or not 
        // find user details by given payload 
        if (payload.email != null) {
            let userDetails = await fetchUserDetailsByPayload({ email: payload.email, _id: { $ne: payload._id } })
            if (userDetails.success) {
                if (userDetails.data != null) {
                    // user data exist with same email id 
                    return {
                        success: false,
                        msg: "User already exist with this email",
                        errorCode: HTTP_STATUS_CODE.CONFLICT
                    }
                }
            }
        }

        if (payload.password != null) {
            let encPassword = await generateBcryptPassword(payload.password);
            payload.password = encPassword
        }
        // fetch user details with email
        let updateDetails = await createOrUpdateUserDetailsByPayload({ _id: payload._id }, payload)
        return updateDetails
    } catch (error) {
        console.log(error)
        throw error;
    }
}

// function used to fetch all user details 
exports.fetchAllUserDetails = async (userRole) => {

    try {
        // let userType = []
        // // fetch all the user details 
        // if (userRole == "user") {
        //     userType = ["public"]
        // } else {
        //     userType = ["public", "private"]

        // }

        // fetch the user details with user types 
        let userDetails = await fetchAllUserDetailsByPayload()
        return userDetails
    } catch (error) {
        console.log(error)
        throw error;
    }
}



// function used to fetch organizations details 
exports.fetchAllOrganizationsDetails = async () => {
    try {
        // fetch user details with email
        let userDetails = await fetchAllOrganizationsDetails()
        if (userDetails.success) {
            let finalUserDetails = {}
            userDetails.data.map((data) => {
                if (finalUserDetails[data._id] == null) {
                    finalUserDetails[data._id] = data
                    finalUserDetails[data._id].userDetails = [finalUserDetails[data._id].userDetails]
                } else {
                    finalUserDetails[data._id].userDetails.push(data.userDetails)
                }
            })
            return {
                success: true,
                data: Object.values(finalUserDetails),
                msg: "Successfully fetched the organizations details "
            }
        } else {
            return userDetails
        }
        return userDetails
    } catch (error) {
        console.log(error)
        throw error;
    }
}
// function used to update user image 

exports.updateUserImage = async (payload, files) => {
    try {
        if (files != null && files[0] != null) {
            // get file path and merge with local host url and update
            payload.image = process.env.BASEURL + files[0].filename
        }

        if (payload.imageUrl != null && payload.imageUrl != "") {
            payload.image = imageUrl
        }
        // fetch user details with email
        let updateDetails = await createOrUpdateUserDetailsByPayload({ _id: payload._id }, payload)
        return updateDetails
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// update user details after google sign in 
exports.updateUserDetailsGoogleSignIn = async (payload) => {

    try {
        // fetch user details with email
        let updateDetails = await createOrUpdateUserDetailsByPayload({ email: payload.email }, {
            name: payload.name,
            email: payload.email,
            image: payload.picture
        })
        return updateDetails
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// function used to delete user details 
exports.deleteUserDetails = async (_id) => {
    try {
        // delete user details 
        return deleteUserDetailsByPayload({ _id: _id })
    } catch (error) {
        console.log(error)
        throw error;
    }
}