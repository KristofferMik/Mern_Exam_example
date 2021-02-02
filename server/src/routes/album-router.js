const express = require('express');

const AlbumCtrl = require('../controllers/album-ctrl.js');

const router = express.Router();

// router.post('/album', AlbumCtrl.createMovie);
router.get('/album/:id', AlbumCtrl.getMovieById);
router.get('/albums', AlbumCtrl.getMovies);
router.put('/albumReview', AlbumCtr.putAlbumReview)

module.exports = router;
