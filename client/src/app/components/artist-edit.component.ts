import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';

@Component({
    selector: 'artist-edit',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService]
})

export class ArtistEditComponent implements OnInit {
    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ) {
        this.titulo = 'Crear nuevo artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');
        this.is_edit = true;

    }

    ngOnInit() {
        console.log('artist-edit.component.ts cargado');
        //llamar al método del api para sacar un artista con base a su id;
        this.getArtist();
    }


    getArtist() {
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
                        console.log("esto tiene la variable " + this.artist);

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
    }
    /*getArtist() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    this.artist = response.artist;
            
                    if(!response.artist){
                    this._router.navigate(['/']);
                    }else{
                         this.artist = response.artist;
                    }
                }, , error => {
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


}
