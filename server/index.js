require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


// connecting to the db
require('./db/connect_db');

// import routers 
const user_router = require('./routes/user');
const summary_router = require('./routes/openAi');


app.get('/', (req, res) => {
    res.send("Hello world!")
})

// other middlewares
app.use(express.json());
app.use(cors());


// using middleware or to set routes
app.use("/api/user", user_router);
app.use("/", summary_router);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})