'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/album'

});
api.get('/obtenerAlbum/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.post('/registarAlbum', md_auth.ensureAuth, AlbumController.saveAlbum);
api.get('/obtenerAlbums/:artist', md_auth.ensureAuth, AlbumController.getAlbums);
api.put('/actualizarAlbum/:id', md_auth.ensureAuth, AlbumController.updateAlbum);
api.delete('/eliminarAlbum/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);
api.post('/actualizarImagenAlbum/:id', [md_auth.ensureAuth,md_upload], AlbumController.uploadImage);
api.get('/obtenerImagenAlbum/:imageFile',AlbumController.getImageFile);
module.exports = api;
