//the path for serving frontend through express
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
app.use(express.static(path.resolve('..', 'client', 'build'))); //serving frontend through express

//Events regarding the database connection.
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//adds routes
app.use('/api', userRouter);
app.use('/api', albumRouter);

app.get('*', (req, res) =>
  res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

//kode 401 is for Unauthorized. aka if the user does not permission. https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

// Starts listening for requests.
app.listen(apiPort, () => console.log(`${appName} Server running on port ${apiPort}`));