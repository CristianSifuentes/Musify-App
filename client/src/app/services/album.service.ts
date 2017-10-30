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

    getAlbums(token, artistId = null) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({ headers: headers });

        if (artistId == null) {
            return this._http.get(this.url + "obtenerAlbums/", options).map(res => res.json());
        } else {
            return this._http.get(this.url + "obtenerAlbums/" + artistId, options).map(res => res.json());
        }


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

    getAlbum(token, id: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + "obtenerAlbum/" + id, options).map(res => res.json());
    }

    editAlbum(token, id: string, album: Album) {
        let params = JSON.stringify(album);

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url + "actualizarAlbum/" + id, params, { headers: headers })
            .map(res => res.json());
    }

    
    deleteAlbum(token, id: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({ headers: headers });
        return this._http.delete(this.url + "eliminarAlbum/" + id, options).map(res => res.json());
    }


}





