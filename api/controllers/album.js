'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');


var Artist = require('../models/artists');
var Album = require('../models/album');
var Song = require('../models/song');

//Método que obtiene los datos de un artista
function getAlbum(req, res) {

    var albumId = req.params.id;
    console.log('albumId : ' + albumId);

    Album.findById(albumId).populate({ path: 'artist' }).exec((err, album) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!album) {
                res.status(404).send({ message: 'El Album no existe' });
            } else {
                res.status(200).send({ album });
            }
        }
    });

}

function saveAlbum(req, res) {

    var album = new Album();
    var params = req.body;
    console.log(params);
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;
    album.save((err, albumStored) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!albumStored) {
                res.status(404).send({ message: 'Nom se ha guardado en album' });
            } else {
                res.status(200).send({ album: albumStored });
            }
        }

    });

}



function getAlbums(req, res) {

    var artistId = req.params.artist;

    if (!artistId) {
        //sacar todos los albums de la bbdd
        var find = Album.find({}).sort('title');
    } else {
        //sacar los albums de un artista concreto de la bbdd
        var find = Album.find({ artist: artistId }).sort('year');
    }

    find.populate({ path: 'artist' }).exec((err, albums) => {
        if (err) {
            res.status(500).send({ message: 'Error en la patición' });
        } else {
            res.status(404).send({ albums });
        }
    });


}


function updateAlbum(req, res) {
    var albumId = req.params.id;
    var update = req.body;
    console.log('Entra');

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {

        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!albumUpdated) {
                res.status(404).send({ message: 'No se ha guardado en album' });
            } else {
                res.status(200).send({ album: albumUpdated });
            }

        }

    });
}


function deleteAlbum(req, res) {
    var albumId = req.params.id;

    console.log('Entro =>');
     Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar el album' });
        } else {
            if (!albumRemoved) {
                res.status(404).send({ message: 'El Album no ha sido eliminado' });
            } else {
                res.status(200).send({ message: 'El Album ha sido eliminado' });


                Song.find({ song: songRemoved._id }).remove((err, songRemoved) => {

                    if (err) {
                        res.status(500).send({ message: 'Error al eliminar la canción' });
                    } else {
                        if (!songRemoved) {
                            res.status(404).send({ message: 'La Canción no ha sido eliminado' });
                        } else {
                            res.status(200).send({ message: 'La Canción no ha sido eliminado' });
                        }

                    }
                });
            }
        }
    });
}


//Método que sube una imagen a una carpeta del servidor
function uploadImage(req,res){

    var albumId = req.params.id;
    var file_name = 'No subido...';
    if(req.files){
       var file_path = req.files.image.path;
       var file_split = file_path.split('\\');
       var file_name = file_split[2];
       var ext_split = file_name.split('\.');
       var file_ext = ext_split[1];
       console.log(ext_split);
       if(file_ext == 'png' || file_ext == 'jpg' || file_ext=='gif'){
          Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated) =>{
             if(!albumUpdated){
                 res.status(404).send({menssage: 'No se ha podido actualizar el album'});
            }else{
                res.status(200).send({album: albumUpdated});
            }
          });
       }else{
         res.status(200).send({message:'Extensión de archivo no válida'});
       }

    }else{
        res.status(500).send({message : 'No ha subido ninguna imagen'});
    }
}

function getImageFile(req, res){
   var imageFile = req.params.imageFile;
   var path_file = './uploads/album/'+ imageFile;
   fs.exists(path_file, function(exists){
       if(exists){
           res.sendFile(path.resolve(path_file));
       }else{
           res.status(200).send({ message : 'No existe el album'});
       }
   });

}
//Shift + Alt + F auto-ident
module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
    
}