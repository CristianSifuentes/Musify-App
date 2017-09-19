'use strict'

var express = require('express');
var SongController = require('../controllers/song');
var api = express.Router();
var md_aut = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/song'

});

api.post('/registarCancion', md_aut.ensureAuth, SongController.saveSong);
api.get('/obtenerCancion/:id', md_aut.ensureAuth, SongController.getSong);
api.get('/obtenerCanciones/:album?', md_aut.ensureAuth, SongController.getSongs);
api.put('/actualizarCancion/:id', md_aut.ensureAuth,SongController.updateSongs);
api.delete('/eliminarCancion/:id', md_aut.ensureAuth, SongController.deleteSong);
api.post('/actualizarImagenCancion/:id', [md_aut.ensureAuth,md_upload], SongController.uploadFile);
api.get('/obtenerImagenCancion/:imageFile',SongController.getSongFile);
module.exports = api;
