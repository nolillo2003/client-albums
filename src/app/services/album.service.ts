import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Album } from '../models/album';
import { GLOBAL } from './global';

@Injectable()
export class AlbumService {

    private _http: Http;
    private url: string;

    constructor(_http: Http) {
        this.url = GLOBAL.url;
        this._http = _http
    }

    getAlbums() {
        return this._http
        .get(this.url + 'albums')
        .pipe(map((res: Response) => res.json())); 
    }

    getAlbum(id: string) {
        return this._http
        .get(this.url + 'album/' + id)
        .pipe(map((res: Response) => res.json())); 
    }    

    addAlbum(album: Album) {
        let json = JSON.stringify(album);
        let params = json;
        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http
        .post(this.url + 'album', params, { headers: headers})
        .pipe(map((res: Response) => res.json())); 
    }   
    
    editAlbum(id: string, album: Album) {
        let json = JSON.stringify(album);
        let params = json;
        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http
        .put(this.url + 'album/' + id, params, { headers: headers})
        .pipe(map((res: Response) => res.json())); 
    }   
    
    deleteAlbum(id: string) {
        return this._http
        .delete(this.url + 'album/' + id)
        .pipe(map((res: Response) => res.json())); 
    }     
}