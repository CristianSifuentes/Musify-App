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
        });


    }


}
