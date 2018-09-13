import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Album } from '../models/album';
import { Image } from '../models/image';
import { GLOBAL } from './global';

@Injectable()
export class ImageService {

    private _http: Http;
    private url: string;

    constructor(_http: Http) {
        this.url = GLOBAL.url;
        this._http = _http
    }

    getImages(albumId: string = null) {
        if (albumId == null) {
            return this._http
                .get(this.url + 'images')
                .pipe(map((res: Response) => res.json()));
        } else {
            return this._http
                .get(this.url + 'images/' + albumId)
                .pipe(map((res: Response) => res.json()));
        }
    }

    getImage(id: string) {
        return this._http
            .get(this.url + 'image/' + id)
            .pipe(map((res: Response) => res.json()));
    }

    addImage(image: Image) {
        let json = JSON.stringify(image);
        let params = json;
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http
            .post(this.url + 'image', params, { headers: headers })
            .pipe(map((res: Response) => res.json()));
    }

    editImage(id: string, image: Image) {
        let json = JSON.stringify(image);
        let params = json;
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http
            .put(this.url + 'image/' + id, params, { headers: headers })
            .pipe(map((res: Response) => res.json()));
    }

    deleteImage(id: string) {
        return this._http
            .delete(this.url + 'image/' + id)
            .pipe(map((res: Response) => res.json()));
    }

    uploadImageFile(id: string, file: File) {
        //creamos el formdata
        let formData: FormData = new FormData();
        formData.append('image', file, file.name);
        //creamos la cabecera
        let headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        return this._http
            .post(this.url + 'uploadimage/' + id, formData, { headers: headers })
            .pipe(map((res: Response) => res.json()));
    }

    getApiUrl(segment: string = ''){
        return this.url + segment;
    }
}