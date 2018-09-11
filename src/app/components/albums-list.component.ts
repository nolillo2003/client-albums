import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';


@Component({
    selector: 'albums-list',
    templateUrl: '../views/albums-list.html',
    providers: [
        AlbumService
    ]
})

export class AlbumsListComponent implements OnInit{
    
    private _route: ActivatedRoute;
    private _router: Router;
    private _albumService: AlbumService;
    
    public titulo: string;
    public albums: Album[];
    public errorMessage: any;

    constructor(_route: ActivatedRoute, _router: Router, _albumService: AlbumService){
        this._route = _route;
        this._router = _router;
        this._albumService = _albumService;
    }

    ngOnInit(){
        this.titulo = 'Listado de albums';
        console.log("Albums-list.component.ts cargado");      
        
        // Al iniciar cargamos los albums desde la API
        this.getAlbums();
    }

    getAlbums(){
        this._albumService.getAlbums().subscribe(
            result => {
                // Resultado de la API (nos devuelve JSON)
                this.albums = result.albums;

                if (!this.albums){
                    alert('Error en el servidor');
                }                
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null){
                    console.log(this.errorMessage);
                }
            }
        );
    }
}