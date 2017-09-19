'use strict'
var path = require('path');
var fs = require('fs');


var Artist = require('../models/artists');
var Album = require('../models/album');
var Song = require('../models/song');

//Método que obtiene los datos de un artista
function getArtist(req, res) {

    var artistId = req.params.id;
    Artist.findById(artistId).populate({ path: 'album' }).exec((err, artist) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!artist) {
                res.status(404).send({ message: 'El artista no existe' });
            } else {
                res.status(200).send({ artist });
            }
        }
    });



}


//Método que almacena los datos de un artista
function saveArtist(req, res) {
    var artist = new Artist();
    var params = req.body;
    console.log(params);
    artist.name = params.name;
    artist.description = params.description;
    artist.image = null;
    artist.save((err, artistStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar el artista' });
        } else {
            if (!artistStored) {
                res.status(404).send({ message: 'el artista no ha sido guardado' });
            } else {
                res.status(200).send({ artist: artistStored });
            }
        }


    });
}


//Método que obtiene los artistas con un paginado usando el framework mongoose-pagination 
function getArtists(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, function (err, artists, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!artists) {
                res.status(404).send({ message: 'No hay artistas' });
            } else {
                return res.status(200).send({ total_items: total, artists: artists });
            }
        }

    });
}

//Método que actualiza los datos de un artista
function updateArtist(req, res) {
    var artistid = req.params.id;
    var update = req.body;


    Artist.findByIdAndUpdate(artistid, update, (err, artistUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar el artista' });
        } else {
            if (!artistUpdated) {
                res.status(404).send({ message: 'El Artista no ha sido actualizado' });
            } else {
                return res.status(200).send({ artist: artistUpdated });
            }
        }
    });


}

//Método que elimina los datos de un artista
function deleteArtist(req, res) {
    var artistid = req.params.id;

    Artist.findByIdAndRemove(artistid, (err, artistRemoved) => {

        if (err) {
            res.status(500).send({ message: 'Error al eliminar el artista' });
        } else {
            if (!artistRemoved) {
                res.status(404).send({ message: 'El Artista no ha sido eliminado' });
            } else {
                res.status(200).send({ artist: artistRemoved });

                Album.find({ artist: artistRemoved._id }).remove((err, albumRemoved) => {
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
        }

    });
}

//Método que sube una imagen a una carpeta del servidor
function uploadImage(req, res) {
    console.log('Llego!');
    var artistId = req.params.id;
    var file_name = 'No subido...';
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        console.log(ext_split);
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            Artist.findByIdAndUpdate(artistId, { image: file_name }, (err, artistUpdated) => {
                if (!artistUpdated) {
                    res.status(404).send({ menssage: 'No se ha podido actualizar el artista' });
                } else {
                    res.status(200).send({ artist: artistUpdated });
                }
            });
        } else {
            res.status(200).send({ message: 'Extensión de archivo no válida' });
        }

    } else {
        res.status(500).send({ message: 'No ha subido ninguna imagen' });
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/artists/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la imagen' });
        }
    });

}
module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}