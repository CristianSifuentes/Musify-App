import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    getArtists(token, page) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({
            headers: headers
        });
        return this._http.get(this.url + 'obtenerArtistas/' + page, options).map(res => res.json());
    }


    getArtist(token, artist: Artist) {
        console.log('entro a getArtist');
        let params = JSON.stringify(artist);
        console.log('params ... ', params);
        let id = params['_id'];
        console.log('Después ' + id);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({
            headers: headers
        });
        return this._http.get(this.url + 'obtenerArtista/' + id , options).map(res => 
            {
            res.json()
            console.log(res.json())
        
        });
    }

    addArtist(token, artist: Artist) {
        let params = JSON.stringify(artist);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        /*http://localhost:3977/api/artist*/
        return this._http.post(this.url + 'registarArtista', params, { headers: headers }).map(res => res.json());
    }

    editArtist(token, id: string, artist: Artist) {
        let params = JSON.stringify(artist);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        /*http://localhost:3977/api/artist*/
        return this._http.put(this.url + 'actualizarArtista/' + id, params, { headers: headers }).map(res => res.json());
    }

    deleteArtist(token, id: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({
            headers: headers
        });
        return this._http.delete(this.url + 'eliminarArtista/' + id, options).map(res => res.json());
    }

}





