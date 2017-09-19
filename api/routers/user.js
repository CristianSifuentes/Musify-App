'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var api = express.Router();
var md_aut = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/users'

});
api.get('/probando-controlador',md_aut.ensureAuth,UserController.pruebas);
api.post('/registarUsuario',UserController.saveUser);
api.post('/loginUsuario',UserController.loginUser);
api.put('/actualizarUsuario/:id',md_aut.ensureAuth,UserController.updateUser);
api.post('/actualizarImagenUsuario/:id',[md_aut.ensureAuth,md_upload],UserController.uploadImage);
api.get('/obtenerImagenUsuario/:imageFile',UserController.getImageFile);
module.exports = api;
