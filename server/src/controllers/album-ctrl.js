const Album = require('../models/album-model.js');

getAlbums = async (req, res) => {
  try {
    response = await Album.find();
  } catch (error) {
    console.error("getAlbums:", error.message);
    res.status(400).json({succes: false, body: "An unexpected error"});
    return;
  }

  if (!response) {
    res.status(404).json({succes: false, body: "No albums found"});
    return;
  }

  res.status(200).json({succes: true, body: response});
} 

getAlbum = async (req, res) => {
  let response;
  try {
    response = await Album.findById(req.params.id);
  } catch (error) {
    console.error("getAlbum:", error.message);
    res.status(400).json({succes: false, body: "An unexpected error"});
    return;
  }

  if (!response) {
    res.status(404).json({succes: false, body: "No album found"});
    return;
  }

  res.status(200).json({succes: true, body: response});
}

putAlbumReview = async (req, res) => {
  await res.json({msg: `Hello, putAlbumReview`});
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