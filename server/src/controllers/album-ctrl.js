const Album = require('../models/album-model.js');

getAlbums = async (req, res) => {
  res.json({msg: `Hello, ${req.params.name}`});
} 

getAlbum = async (req, res) => {
  res.json({msg: `Hello, ${req.params.name}`});
}

putAlbumReview = async (req, res) => {
  res.json({msg: `Hello, ${req.params.name}`});
}

module.exports = {
  getAlbums,
  getAlbum,
  putAlbumReview
}