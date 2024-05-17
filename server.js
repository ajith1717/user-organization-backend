// declare express
const express = require("express")

const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const cors = require('cors');
//  use route 
const userRoute = require("./routes/users")
const authRoutes = require("./routes/authRoutes")
const organizationRoutes = require("./routes/organization")
app.use(bodyParser.json({ limit: "20MB" }));

// 👇️ Configure CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', authRoutes);
app.use('/api/organization', organizationRoutes);

app.use("/api/user", userRoute);




// exports
module.exports = app