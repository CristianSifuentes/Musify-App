'user strict'

var fs = require('fs');//para acceder a archivos del sistema
var path = require('path');//para trabar con los path de los archivos y ficheros
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, res){
    res.status(200).send({
      message: 'Probando una acción del controlador del api de res de usuarios'

    });
}

//Método que inserta un nuevo usuario
function saveUser(req,res){
    
    var user = new User();
    var params = req.body;
    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    if(params.password){
        bcrypt.hash(params.password, null , null, function(err, hash){
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null){
                //Guardar el usuario
                user.save((err, userStored)=>{
                    if(err){
                         res.status(500).send(
                           { menssage: 'Error al guardar el usuario'}
                         );
                    }else{
                        if(!userStored){
                            res.status(404).send(
                                {message: 'No se ha registrado usuario'}
                                );
                        }else{
                            res.status(200).send(
                                {message: userStored}
                            );
                        }

                    }

                });
            }else{
                res.status(200).send({
                    message: 'Rellena todos los campos'

                });
            }
            

        });
    }else{
        res.status(200).send(
          {
              menssage : 'Introduce la contraseña'
          }

        );
    }

}

//Método que se encarga hacer el login
function loginUser(req, res){
  var params = req.body;
   var email = params.email;
   var password = params.password;
   User.findOne({
       email: email.toLowerCase()
   }, (err,user)=>{
       if(err){
             res.status(500).send({menssage: 'Error en la petición'});
       }else{
           if(!user){
               res.status(404).send({menssage: 'El usuario no existe'});
           }else{
               //Compara las contraseñas
               bcrypt.compare(password,user.password, function(err,check){
                    if(check){
                        //devolver  los datos del usuario logeado
                        if(params.gethash){
                            //devolver un token de jwt
                            res.status(200).send({
                               token: jwt.createToken(user)

                            });
                        }else{
                               res.status(200).send(user);
                        }
                    }else{
                         res.status(404).send({menssage: 'El usuario no ha posido logearse', params: params});
                    }
               });
           }
       }

       
   });
}

//método que actualiza los datos de un usuario
function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permisos para actualizar este usuario'});
    }

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => 
    {
        if(err){
             res.status(500).send({menssage: 'Error al actualizar el usuario'});
        }else{
            if(!userUpdated){
                 res.status(404).send({menssage: 'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }


    });

}

//Método que sube una imagen a una carpeta del servidor
function uploadImage(req,res){
    var userId = req.params.id;
    var file_name = 'No subido...';
    if(req.files){
       var file_path = req.files.image.path;
       var file_split = file_path.split('\\');
       var file_name = file_split[2];
       var ext_split = file_name.split('\.');
       var file_ext = ext_split[1];
       console.log(ext_split);
       if(file_ext == 'png' || file_ext == 'jpg' || file_ext=='gif'){
          User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) =>{
             if(!userUpdated){
                 res.status(404).send({menssage: 'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({image: file_name, user: userUpdated});
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
   var path_file = './uploads/users/'+imageFile;
   fs.exists(path_file, function(exists){
       if(exists){
           res.sendFile(path.resolve(path_file));
       }else{
           res.status(200).send({ message : 'No existe la imagen'});
       }
   });

}



module.exports = {
   pruebas,
   saveUser,
   loginUser,
   updateUser,
   uploadImage,
   getImageFile
};