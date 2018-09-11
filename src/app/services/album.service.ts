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
        return this._http.get(this.url + 'albums').pipe(map((res: Response) => res.json())); 
    }
}