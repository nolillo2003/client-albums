import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';


@Component({
    selector: 'album-add',
    templateUrl: '../views/album-add.html',
    providers: [
        AlbumService
    ]
})

export class AlbumAddComponent implements OnInit{
    
    private _route: ActivatedRoute;
    private _router: Router;
    private _albumService: AlbumService;

    public titulo: string;
    public album: Album;
    public errorMessage: any;

    constructor(_route: ActivatedRoute, _router: Router, _albumService: AlbumService){
        this._route = _route;
        this._router = _router;
        this._albumService = _albumService;
    }

    ngOnInit(){
        this.titulo = 'Crear nuevo album';
        console.log("album.add.component.ts cargado");      
        
        this.album = new Album('','');

    }

    onSubmit(){
       this._albumService.addAlbum(this.album)
       .subscribe(
           response => {
               if (!response.album){
                   alert("Error en el servidor");
                   return;
               }
               
               this.album = response.album;

               this._router.navigate(['/']);
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
