import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { GLOBAL } from './global';
import { Song } from '../models/song';

@Injectable()
export class SongService {
    public url: string;
    public song: Song;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    
    addSong(token, song: Song) {
        let params = JSON.stringify(song);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        /*http://localhost:3977/api/artist*/
        return this._http.post(this.url + 'registarCancion', params, { headers: headers }).map(res => res.json());
    }

    


}





