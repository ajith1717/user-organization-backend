const express = require('express');
const axios = require('axios');
const router = express.Router();

const CLIENT_ID = "230179937-mofddnvq4kcfcgloi8q93fh6m0qbqlia.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

const URI = 'http://localhost:5001/auth/google/callback';
const { google } = require('googleapis');
const { updateUserDetailsGoogleSignIn } = require('../services/userServices');

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    URI
);

router.get('/auth/google', (req, res) => {
    const AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${URI}&response_type=code&scope=profile email`;
    res.redirect(AUTH_URL);
});
// Callback URL for handling the Google Login response
router.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;

    try {

        let { tokens } = await oauth2Client.getToken(code);

        // Use access_token or id_token to fetch user profile
        const profile = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        });

        // Code to handle user authentication and retrieval using the profile data

        console.log("google login data ------", profile)
        // save the profile data and send response 
        let userDetails = await updateUserDetailsGoogleSignIn(profile?.data)
        if (userDetails.success) {
            if (userDetails.data.password == "") {
                res.redirect('/password?_id=' + userDetails?.data?._id);
            } else {
                res.redirect('/');
            }
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.error('Error:', error?.response?.data?.error);
        res.redirect('/');
    }
});



module.exports = router;
