import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { SongService } from '../services/song.service';

import { Song } from '../models/song';

@Component({
    selector: 'song-add',
    templateUrl: '../views/song-add.html',
    providers: [UserService, SongService]
})

export class SongAddComponent implements OnInit {
    public titulo: string;
    public song: Song;
    public identity;
    public token;
    public url: string;
    public alertMessage: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _songService: SongService
    ) {
        this.titulo = 'Crear nueva canción';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.song = new Song('', '', '', '', '');

    }

    ngOnInit() {
        console.log('song-add.component cargado');
    }

    onSubmit() {

        this._route.params.forEach((params: Params) => {
            let album_id = params['album'];
            this.song.album = album_id;
            console.log(this.song);

        });
        this._songService.addSong(this.token, this.song).subscribe(

            response => {
                this.song = response.song;

                if (!response.song) {
                    this.alertMessage = 'Error en el servidor';
                } else {
                    this.alertMessage = 'La canción se ha creado correctamente!';
                    this.song = response.song;
                    //this._router.navigate(['/editar-song', response.song._id]);
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

        /*this._albumService.addAlbum(this.token, this.album)
            .subscribe(

            response => {
                this.album = response.album;

                if (!response.album) {
                    this.alertMessage = 'Error en el servidor';
                } else {
                    this.alertMessage = 'El album de ha creado correctamente!';
                    this.album = response.album;
                    this._router.navigate(['/editar-album', response.album._id]);
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

        console.log(this.album);*/

    }

}

