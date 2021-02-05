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
  const reviewStats = prepareAlbum(queryres);
  res.status(200).json({succes: true, body: {'album': queryres, 'reviewStats': reviewStats}});
}

putAlbumReview = async (req, res) => {
  let newReview;

  if (req.body.rating < 1 || req.body.rating > 10) {
    res.status(400).json({succes: false, body: "Rating out of range."});
    return;
  }

  try {
 
    newReview = await Album.findByIdAndUpdate(req.body.id, { $push: {"reviews": {rating: req.body.rating, body: req.body.body, creator: req.body.creator, DateOfCreation: Date.now()}}}, {new: true});
  } catch (error) {
    console.error("putAlbumReview:", error.message);
    res.status(400).json({succes: false, body: "An unexpected error"});
  }

  if (!newReview) {
    res.status(404).json({succes: false, body: "No album found"});
    return;
  }
  const reviewStats = prepareAlbum(newReview);
  res.status(201).json({succes: true, body: {'album': newReview, 'reviewStats': reviewStats}});
}

module.exports = {
  getAlbums,
  getAlbum,
  putAlbumReview
}

/*Gets the number of reviews on the Album, then saves as reviewCount
  Gets the total rating of all reviews and divide that with reviewCount, then saves as reviewAvg
  Removes all reviews with empty body. No need to display them.
  adds reviewCount and reviewAvg to a reviewStats and returns that
  Would be better if reviews were a subdocument instead. If time (and brain power) permits, see to that. 
*/
function prepareAlbum(album){
  const reviewCount = album.reviews.length;
  let reviewAvg = 0; 

  album.reviews.forEach(o => reviewAvg += o.rating);
  reviewAvg /= reviewCount;

  album.reviews = album.reviews.filter(o => o.body.length >= 1);
  const reviewStats = {'reviewCount': reviewCount, 'reviewAvg': reviewAvg};
  return reviewStats;
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