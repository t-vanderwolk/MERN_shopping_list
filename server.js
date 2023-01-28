const express = require('express');
const dotenv = require("dotenv")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const items =require('./routes/api/items');
const user = require("./routes/api/user")
const connectToDatabase = require("./database")


const app = express();
//Bodyparser Middleware
app.use(bodyParser.json());
dotenv.config()

// Mongo Connect
connectToDatabase()

//Use Routes
app.use('/api/items', items);
app.use("/api/user", user)

//Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
//SET STATIC FOLDER
app.use(express.static('client/build'));

get.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
}

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server started on port ${port}`));