import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';

@Component({
    selector: 'artist-detail',
    templateUrl: '../views/artist-detail.html',
    providers: [UserService, ArtistService]
})

export class ArtistDetailComponent implements OnInit {
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage: string;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit() {
        console.log('artist-detail.component.ts cargado');
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
                         //sacar los albumns del artista

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



}
