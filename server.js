// declare express
const express = require("express")

const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const swaggerSetup = require('./swagger'); // Adjust the path if necessary


const swaggerUi = require('swagger-ui-dist');
const cors = require('cors');
//  use route 
const casesRoute = require("./routes/cases");
const { sendSocketMessage } = require("./websocket/socket");

app.use(bodyParser.json({ limit: "20MB" }));
// Serve Swagger UI static files
app.use('/swagger-ui-dist', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));
// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, 'index.html'));
// });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Swagger setup
swaggerSetup(app);
// 👇️ Configure CORS
app.use(cors());
// app.all('*', (req, res) => {
//     return handle(req, res);
// });
app.get("/", (req, res) => { res.send("Express on Vercel ..."); });
// app.use("/api/user", patientRoute);
app.use("/api/case", casesRoute);


// exports
module.exports = app;



// ssh -i /Users/subramaniam/Documents/adk_er.pem ec2-user@65.2.125.86
