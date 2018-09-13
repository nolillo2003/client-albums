import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ImageService } from '../services/image.service';
import { Image } from '../models/image';


@Component({
    selector: 'image-detail',
    templateUrl: '../views/image-detail.html',
    providers: [
        ImageService
    ]
})

export class ImageDetailComponent implements OnInit {

    private _route: ActivatedRoute;
    private _router: Router;
    private _imageService: ImageService;
    

    public image: Image;
    public api_url: string;
    public errorMessage: any;
    private loading: boolean;
    public confirmado: string;

    constructor(_route: ActivatedRoute, _router: Router, _imageService: ImageService) {
        this._route = _route;
        this._router = _router;
        this._imageService = _imageService;
    }

    ngOnInit() {
        console.log("image-detail.component.ts cargado");

        // Al iniciar cargamos los albums desde la API
        this.api_url = this._imageService.getApiUrl('get-image/');
        this.getImage();
    }

    getImage() {
        this.loading = true;

        // Obtengo el id desde la URL
        this._route.params.forEach((params: Params) => {

            let id = params['id'];

            this._imageService.getImage(id).subscribe(
                result => {
                    // Resultado de la API (nos devuelve JSON)
                    this.image = result.image;

                    if (!this.image) {
                        this._router.navigate(['/']);
                        return;
                    }

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

    onDeleteConfirm(id: string){
        this.confirmado = id;
    }

    onCancelDeleteConfirm(){
        this.confirmado = null;
    }

    onDeleteImage(id: string){
        this._imageService.deleteImage(id).subscribe(
            result => {
                if (!result.image){
                    alert('Error en el servidor');
                } 

                this._router.navigate(['/album', result.image.album]);
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null){
                    console.log(this.errorMessage);
                }

                //this.getAlbums();
            }
        );
    }     
}
