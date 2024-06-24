// declare express
const express = require("express")

const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const swaggerSetup = require('./swagger'); // Adjust the path if necessary

const cors = require('cors');
//  use route 
const patientRoute = require("./routes/patients")
const casesRoute = require("./routes/cases")
app.use(bodyParser.json({ limit: "20MB" }));

// Swagger setup
swaggerSetup(app);
// 👇️ Configure CORS
app.use(cors());
app.get("/", (req, res) => { res.send("Express on Vercel ..."); });
// app.use("/api/user", patientRoute);
app.use("/api/case", casesRoute);




// exports
module.exports = app