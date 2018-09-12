import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ImageService } from '../services/image.service';
import { Image } from '../models/image';


@Component({
    selector: 'image-add',
    templateUrl: '../views/image-add.html',
    providers: [
        ImageService
    ]
})

export class ImageAddComponent implements OnInit{
    
    private _route: ActivatedRoute;
    private _router: Router;
    private _imageService: ImageService;

    public titulo: string;
    public image: Image;
    public errorMessage: any;

    constructor(_route: ActivatedRoute, _router: Router, _imageService: ImageService){
        this._route = _route;
        this._router = _router;
        this._imageService = _imageService;
    }

    ngOnInit(){
        this.titulo = 'Agregar nueva imagen';
        console.log("image.add.component.ts cargado");      
        
        this.image = new Image('','','');

    }

    onSubmit(){
       this._imageService.addImage(this.image)
       .subscribe(
           response => {
               if (!response.image){
                   alert("Error en el servidor");
                   return;
               }
               
               this.image = response.image;

               this._router.navigate(['/album',]);
           },
           error => {
            this.errorMessage = <any>error;

            if (this.errorMessage != null){
                console.log(this.errorMessage);
            }               
           }
       )
    }
}
