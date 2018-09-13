import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ImageService } from '../services/image.service';
import { Image } from '../models/image';

import { GLOBAL } from '../services/global';


@Component({
    selector: 'image-edit',
    templateUrl: '../views/image-add.html',
    providers: [
        ImageService
    ]
})

export class ImageEditComponent implements OnInit {

    private _route: ActivatedRoute;
    private _router: Router;
    private _imageService: ImageService;

    public titulo: string;
    public image: Image;
    public errorMessage: any;
    public is_edit: boolean;
    public resultUpload;
    public filesToUpload: Array<File>;    

    constructor(_route: ActivatedRoute, _router: Router, _imageService: ImageService) {
        this._route = _route;
        this._router = _router;
        this._imageService = _imageService;
    }

    ngOnInit() {
        this.titulo = 'Editar imagen';
        console.log("image.edit.component.ts cargado");

        this.image = new Image('', '', '');
        this.is_edit = true;
        this.getImage();
    }

    getImage() {
        // Obtengo el id de la imagen desde la URL
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._imageService.getImage(id).subscribe(
                response => {
                    if (!response.image) {
                        alert("Error en el servidor");
                        return;
                    }

                    this.image = response.image;


                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                    }

                    this._router.navigate(['/']);
                }
            );
        });
    }

    onSubmit() {
        // Obtengo el id del album desde la URL
        this._route.params.forEach((params: Params) => {

            let id = params['id'];

            this._imageService.editImage(id, this.image)
                .subscribe(
                    response => {
                        if (!response.image) {
                            alert("Error en el servidor");
                            return;
                        }

                        this.image = response.image;

                        /*
                        this._imageService.uploadImageFile(id,this.filesToUpload[0])
                            .subscribe(
                                response => {
    
                                },
                                error => {
    
                                }
                            )                    
                        */

                        if (!this.filesToUpload) {
                            this._router.navigate(['/album', this.image.album]);
                        } else {
                            // Subir imagen
                            this.uploadImages(GLOBAL.url + 'upload-image/' + id, [], this.filesToUpload)
                                .then(
                                    (result) => {
                                        this.resultUpload = result;
                                        this.image.picture = this.resultUpload.filename;
                                        this._router.navigate(['/album', this.image.album]);
                                    },
                                    (error) => {
                                        console.log(error);
                                    });
                        }



                    },
                    error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                        }
                    }
                )
        });
    }


    fileChangeEvent(fileInput: any) {
        // Aqui se guardan las rutas de los ficheros a subir
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    uploadImages(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            let formData: FormData = new FormData();
            let xhr = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append('image', files[i], files[i].name);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }

   

}
