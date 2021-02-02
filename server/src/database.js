const mongoose = require('mongoose');
const databaseName = "musiclious";

const MONGO_URL = process.env.MONGO_URL || `mongodb://localhost/${databaseName}`; 

//create connection
mongoose.connect(MONGO_URL, { useNewUrlParser: true , useUnifiedTopology: true})
    .catch(e => {
        console.error('Connection error', e.message)
    });

//get that connection
const db = mongoose.connection;

//export that connection
module.exports = db;