/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

/**** Configuration ****/
const app = express(); 
const apiPort = process.env.PORT || 8080;
const appName = "Musiclious";
const db = require('./database.js');

//require our routes routes
const userRouter = require('./routes/user-router.js');
const albumRouter = require('./routes/album-router.js');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve('..', 'client', 'build'))); 

//Events regarding the database connection.
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('*', (req, res) =>
  res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

//adds routes
app.use('/api', userRouter);
app.use('/api', albumRouter);

// Starts listening for requests.
app.listen(apiPort, () => console.log(`${appName} Server running on port ${apiPort}`));