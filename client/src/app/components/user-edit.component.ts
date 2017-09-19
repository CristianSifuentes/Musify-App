import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'user-edit',
  templateUrl: '../views/user-edit.html',
  providers: [UserService]
})

export class UserEditComponent implements OnInit {

  public titulo: string;
  public user: User;
  public identity;
  public token;
  public alertMessage;
  public url: string;

  constructor(
    private _userService: UserService
  ) {
    this.titulo = 'Actualizar mis datos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
    console.log(this.identity);
    console.log(this.token);
  }

  ngOnInit() {
    console.log('user-edit.component.ts cargando...');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
  }
   
  onSubmit() {
    console.log(this.user);
    this._userService.update_user(this.user).
      subscribe(
      response => {
        console.log(response);

        if (!response) {
          this.alertMessage = 'El usuario no se ha actualizado correctamente';
        } else {

          localStorage.setItem('identity', JSON.stringify(this.user));
          document.getElementById("identity_name").innerHTML = this.user.name;

          if (!this.filesToUpload) {
            //Redirección
          } else {
            this.makeFileRequest(
              this.url + 'actualizarImagenUsuario/' + this.user._id,
              [],
              this.filesToUpload).then(
              (result: any) => {
                this.user.image = result.image;
                localStorage.setItem('identity', JSON.stringify(this.user));
                let imagePath = this.url + 'obtenerImagenUsuario/'+this.user.image;
                document.getElementById('image-logged').setAttribute('src', imagePath);
                console.log(this.user);
              }
              );
            ;


          }
          this.alertMessage = 'El usuario se ha actualizadó correctamente';
        }
      },
      error => {
        var errorMessagex = <any>error;
        if (errorMessagex != null) {
          var body = JSON.parse(errorMessagex._body)
          this.alertMessage = body.menssage;
          console.log(error);

        }
      }

      );
  }

  public filesToUpload: Array<File>;
  public fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  public makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    var token = this._userService.getToken();;
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name)
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }

        }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);

    });

  }
}
