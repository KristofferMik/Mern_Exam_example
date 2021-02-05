const Users = require('../models/user-model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

authUser = async (req, res) => {
  const secret = process.env.SECRET || 'AReallyGoodSecret';

  if (!req.body.password || !req.body.username) {
    res.status(401).json({succes: false, body: "Missing Password or username"});
    return;
  }
  
  let queryres;
  try {
    queryres = await Users.findOne({name: req.body.username});
  } catch (error) {
    console.error("authUser:", error.message);
    res.status(400).json({succes: false, body: "An unexpected error"});
    return;
  }

  if (!queryres) {
    res.status(401).json({succes: false, body: "No Such User"});
    return;
  }

  if (!bcrypt.compareSync(req.body.password, queryres.password)) {
    res.status(401).json({succes: false, body: "Incorrect Password"});
    return;
  }
  const token = jwt.sign({user: queryres.name}, secret, { algorithm: 'HS512', expiresIn: '4h' });
  res.status(200).json({succes: true, body: token});

}

addUser = async (req, res) => {

  if (!req.body.username || !req.body.password) {
    res.status(401).json({succes: false, body: "Missing Password or username"});
    return;
  }

  try {
    if (await Users.findOne({name: req.body.username}) != null) {
      res.status(400).json({succes: false, body: "username taken"});
      return;
    }
  } catch (error) {
    console.error("addUser:", error.message);
    res.status(400).json({succes: false, body: "An unexpected error"});
    return;
  }


  try {
    await Users.create({name: req.body.username, password: bcrypt.hashSync(req.body.password, 10)});
    res.status(200).json({succes: true, body: "User Created! Please log in"});
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  authUser,
  addUser
}

const userBoot = require('./createTestData.js');

async function populateUsers(){
  try {
    if ((await Users.find()).length < 3) {
      try {
        await Users.create(userBoot.createUsersToTest());
        
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

populateUsers();