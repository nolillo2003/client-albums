import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { ImageService } from '../services/image.service';
import { Album } from '../models/album';
import { Image } from '../models/image';


@Component({
    selector: 'albums-detail',
    templateUrl: '../views/album-detail.html',
    providers: [
        AlbumService,
        ImageService
    ]
})

export class AlbumDetailComponent implements OnInit {

    private _route: ActivatedRoute;
    private _router: Router;
    private _albumService: AlbumService;
    private _imageService: ImageService;
    private loading: boolean;

    public album: Album;
    public images: Image[];
    public api_url: string;
    public errorMessage: any;

    constructor(_route: ActivatedRoute, _router: Router, _albumService: AlbumService, _imageService: ImageService) {
        this._route = _route;
        this._router = _router;
        this._albumService = _albumService;
        this._imageService = _imageService;
    }

    ngOnInit() {
        console.log("Album-detail.component.ts cargado");

        // Al iniciar cargamos los albums desde la API
        this.api_url = this._imageService.getApiUrl('get-image/');
        this.getAlbum();
    }

    getAlbum() {
        this.loading = true;

        // Obtengo el id desde la URL
        this._route.params.forEach((params: Params) => {

            let id = params['id'];

            this._albumService.getAlbum(id).subscribe(
                result => {
                    // Resultado de la API (nos devuelve JSON)
                    this.album = result.album;

                    if (!this.album) {
                        this._router.navigate(['/']);
                        return;
                    }

                    // TODO Mostrar todas las imagenes
                    this._imageService.getImages(id).subscribe(
                        result => {
                            this.images = result.images;

                            if (!this.images){
                                alert('Sin imágenes');
                            }


                        },
                        error => {
                            this.errorMessage = <any>error;

                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                this._router.navigate(['/']);
                            }
        
                            this.loading = false;                            
                        }
                    );

                    this.loading = false;
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        this._router.navigate(['/']);
                    }

                    this.loading = false;
                }
            );
        });
    }
}
