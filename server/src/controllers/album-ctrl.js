const Album = require('../models/album-model.js');

getAlbums = async (req, res) => {
  try {
    queryres = await Album.find().select('title').sort({ title: 'asc'});
  } catch (error) {
    console.error("getAlbums:", error.message);
    res.status(400).json({succes: false, body: "An unexpected error"});
    return;
  }

  if (!queryres) {
    res.status(404).json({succes: false, body: "No albums found"});
    return;
  }

  res.status(200).json({succes: true, body: queryres});
} 

getAlbum = async (req, res) => {
  let queryres;
  try {
    queryres = await Album.findById(req.params.id);
  } catch (error) {
    console.error("getAlbum:", error.message);
    res.status(400).json({succes: false, body: "An unexpected error"});
    return;
  }

  if (!queryres) {
    res.status(404).json({succes: false, body: "No album found"});
    return;
  }

  res.status(200).json({succes: true, body: queryres});
}

putAlbumReview = async (req, res) => {
  let newReview;

  if (req.body.rating < 1 || req.body.rating > 10) {
    res.status(400).json({succes: false, body: "Rating out of range."});
    return;
  }

  try {
    newReview = await Album.findByIdAndUpdate(req.body.id, { $push: {"reviews": {rating: req.body.rating, body: req.body.body}}}, {new: true});
  } catch (error) {
    console.error("putAlbumReview:", error.message);
    res.status(400).json({succes: false, body: "An unexpected error"});
  }

  if (!newReview) {
    res.status(404).json({succes: false, body: "No album found"});
    return;
  }

  res.status(201).json({succes: true, body: newReview});
}

module.exports = {
  getAlbums,
  getAlbum,
  putAlbumReview
}

const albumsBoot = require('./createTestData.js');

async function populateAlbum(){

  try {
    if ((await Album.find()).length < 5) {
      try {
        await Album.create(albumsBoot.createAlbumsToTest(5));
        
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

populateAlbum();