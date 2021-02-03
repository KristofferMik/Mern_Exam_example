const express = require('express');

const AlbumCtrl = require('../controllers/album-ctrl.js');

const router = express.Router();

// router.post('/album', AlbumCtrl.createMovie);
router.get('/album/:id', AlbumCtrl.getAlbum);
router.get('/albums', AlbumCtrl.getAlbums);
router.put('/albumReview/:id', AlbumCtrl.putAlbumReview);

module.exports = router;
