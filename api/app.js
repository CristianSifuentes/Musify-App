'use strict'

var express = require('express');
var bodyParser = require("body-parser");

var app = express();

//cargar rutas
var user_routes = require('./routers/user');
var artist_routes = require('./routers/artists');
var album_routes = require('./routers/album');
var song_routes = require('./routers/songs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method ');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);
//app.get('/pruebas', function(req,res){
//  res.status(200).send({ message: 'Bienvenido al curso de cristian' });
//
//});

module.exports = app;