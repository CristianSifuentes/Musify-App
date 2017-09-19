'use strict'

var express = require('express');
var ArtistController = require('../controllers/artist');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/artists'

});
api.get('/obtenerArtista/:id', md_auth.ensureAuth, ArtistController.getArtist);
api.post('/registarArtista', md_auth.ensureAuth, ArtistController.saveArtist);
api.get('/obtenerArtistas/:page?', md_auth.ensureAuth, ArtistController.getArtists);
api.put('/actualizarArtista/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/eliminarArtista/:id', md_auth.ensureAuth, ArtistController.deleteArtist);
api.post('/actualizarImagenArtista/:id', [md_auth.ensureAuth,md_upload], ArtistController.uploadImage);
api.get('/obtenerImagenArtista/:imageFile',ArtistController.getImageFile);
module.exports = api;

