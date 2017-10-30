import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { AlbumService } from '../services/album.service';

import { Album } from '../models/album';

@Component({
    selector: 'album-detail',
    templateUrl: '../views/album-detail.html',
    providers: [UserService, AlbumService]
})

export class AlbumDetailComponent implements OnInit {
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
    public confirmado;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit() {
        console.log('album-detail.component.ts cargado');

        //sacar album de la base de datos
        this.getAlbum();
    }

    getAlbum() {
        console.log('El método funciona');
    }


    /*getArtist() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            console.log(id);
            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    this.artist = response.artist;

                    if (!response) {
                        this.alertMessage = 'Error en el servidor';
                    } else {
                        this.artist = response.artist;
                        //sacar los albumns del artista
                        this._albumService.getAlbums(this.token, response.artist._id)
                            .subscribe(
                            response => {
                                if (!response.albums) {
                                    this.alertMessage = 'Este artista no tiene albums';
                                } else {
                                    this.albums = response.albums;
                                }

                            },

                            error => {
                                var errorMessage = <any>error;

                                if (errorMessage != null) {
                                    var body = JSON.parse(error._body);
                                    this.alertMessage = body.message;
                                    console.log(error)
                                }
                            }
                            );

                    }
                },
                error => {
                    var errorMessage = <any>error;

                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        this.alertMessage = body.message;
                        console.log(error)
                    }
                }
            );
        });
    }*/

    onDeleteConfirm(id) {
        this.confirmado = id;

    }
    onCancelAlbum() {
        this.confirmado = null;
    }





}

