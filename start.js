// start.js

const dotenv = require('dotenv');
dotenv.config();

const { server } = require("./websocket/socket");
const showBanner = require('node-banner');

const port = process.env.PORT || 5001;

server.listen(port, async () => {
    await showBanner('ADK ER', '--------------------------------------', 'red');
    console.log(`SERVER START RUNNING ON PORT ${port}`);
});
