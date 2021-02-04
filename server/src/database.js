const mongoose = require('mongoose');
const databaseName = "musiclious";

const MONGO_URL = process.env.MONGO_URL || `mongodb://localhost/${databaseName}`; 

mongoose.connect(MONGO_URL, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .catch(e => {
        console.error('Connection error', e.message)
    });

const db = mongoose.connection;

module.exports = db;