import { Component, OnInit } from '@angular/core';
import { Song } from '../models/song';
import { GLOBAL } from '../services/global';

@Component({
    selector: 'player',
    template: '<h1>PLAYER</h1>'

})

export class PlayerComponent implements OnInit {


    public url: string;
    public song;

    constructor(){
       this.url = GLOBAL.url
    }

    ngOnInit() {
        console.log('player cargado');
    }
}