//the path for serving frontend through express
const path = require('path');

/**** External libraries ****/
const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const checkJwt = require("express-jwt");

/**** Configuration ****/
const app = express(); 
const apiPort = process.env.PORT || 8080;
const appName = "Musiclious";
const db = require('./database.js');
const secret = process.env.SECRET || 'AReallyGoodSecret';
const openPaths = [

  { url: "/api/user", methods: ["POST"] },
  { url: "/api/userRegister", methods: ["POST"] },
  { url: /\/api\/album\.*/gim, methods: ["GET"] },
  { url: "/api/albums", methods: ["GET"] },
  

  // Opens everything that doesn't begin with "/api"
  /^(?!\/api).*/gim
];

//require our routes routes
const userRouter = require('./routes/user-router.js');
const albumRouter = require('./routes/album-router.js');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve('..', 'client', 'build'))); //serving frontend through express
app.use(checkJwt({ secret, algorithms: ['HS512'] }).unless({ path: openPaths })); 

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") { 
    res.status(401).json({ error: "Please Log in" });
  } else {
    next();
  }
});

//Events regarding the database connection.
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//adds routes
app.use('/api', userRouter);
app.use('/api', albumRouter);

app.get('*', (req, res) =>
  res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);

// Starts listening for requests.
app.listen(apiPort, () => console.log(`${appName} Server running on port ${apiPort}`));