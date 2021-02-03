const Users = require('../models/user-model.js');

authUser = async (req, res) => {

  if (!req.body.password || !req.body.username) {
    res.status(401).json({succes: false, body: "Missing Password or username"});
    return;
  }

  //kode 401 is for Unauthorized. aka if the user does not permission. https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
  let response;
  try {
    response = await Users.find(req.body.username)
  } catch (error) {
    console.error("authUser:", error.message);
    res.status(400).json({succes: false, body: "An unexpected error"});
    return;
  }

  if (!response) {
    res.status(401).json({succes: false, body: "Access Denied"});
    return;
  }

  res.status(200).json({succes: true, body: "Token goes here"});
}

module.exports = {
  authUser
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