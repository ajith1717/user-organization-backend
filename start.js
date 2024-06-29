const dotenv = require('dotenv');
dotenv.config();

const { server, io } = require("./websocket/socket");
const showBanner = require('node-banner');

const port = process.env.PORT || 5001;

server.listen(port, async () => {
    await showBanner('ADK ER - start', '--------------------------------------', 'red');
    console.log(`SERVER START RUNNING ON PORT ${port}`);
});
