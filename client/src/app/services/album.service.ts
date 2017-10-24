import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { GLOBAL } from './global';
import { Album } from '../models/album';

@Injectable()
export class AlbumService {
    public url: string;
    public album: Album;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    addAlbum(token, album: Album) {
        let params = JSON.stringify(album);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        /*http://localhost:3977/api/artist*/
        return this._http.post(this.url + 'registarAlbum', params, { headers: headers }).map(res => res.json());
    }



}




