
const app = require("./server")
const port = 5001;
const dotenv = require('dotenv');
dotenv.config();

app.listen(port, async () => {

    console.log(`Server is running on Port ${port}`,)
});


