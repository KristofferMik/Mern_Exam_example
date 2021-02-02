const User = require('../models/user-model.js');

authUser = (req, res) => {
  res.json({msg: "hello from authUser"});
}

module.exports = {
  authUser
}