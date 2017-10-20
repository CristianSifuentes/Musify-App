import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Component({
    selector: 'album-add',
    templateUrl: '../views/album-add.html',
    providers: [UserService, ArtistService]
})

export class AlbumAddComponent implements OnInit {
    public titulo: string;
    public artist: Artist;
    public albumn: Album;
    public identity;
    public token;
    public url: string;
    public alertMessage: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService    ) {
        this.titulo = 'Crear albumn ';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');
        this.albumn = new Album('', '', '','', '');

    }

    ngOnInit() {
        console.log('album-add.component cargado');
    }

}

