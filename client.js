const express = require('express');
const request = require('request');
const querystring = require('querystring'); // Import querystring module

const app = express();
const clientId = 'client_id';
const clientSecret = 'client_secret';
const redirectUri = 'http://localhost:3000/callback';

app.get('/', (req, res) => {
    res.send('<a href="/auth">Login with OAuth 2.0</a>');
});

app.get('/auth', (req, res) => {
    const params = querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUri,
    });
    res.redirect(`http://localhost:4000/authorize?${params}`);
});

app.get('/callback', (req, res) => {
    const { code } = req.query;
    request.post({
        url: 'http://localhost:4000/token',
        form: {
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
        },
    }, (error, response, body) => {
        const { access_token } = JSON.parse(body);
        res.send(`Access Token: ${access_token}`);
    });
});

app.listen(3001, () => console.log('Client Application started on port 3000'));
