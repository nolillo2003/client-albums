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
    private loading: boolean;

    public titulo: string;
    public albums: Album[];
    public errorMessage: any;
    public confirmado: string;

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
        this.loading = true;

        this._albumService.getAlbums().subscribe(
            result => {
                // Resultado de la API (nos devuelve JSON)
                this.albums = result.albums;

                if (!this.albums){
                    alert('Error en el servidor');
                } 
                
                this.loading = false;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null){
                    console.log(this.errorMessage);
                }

                this.loading = false;
            }
        );
    }

    onDeleteConfirm(id: string){
        this.confirmado = id;
    }

    onCancelDeleteConfirm(){
        this.confirmado = null;
    }

    onDeleteAlbum(id: string){
        this._albumService.deleteAlbum(id).subscribe(
            result => {
                if (!result.album){
                    alert('Error en el servidor');
                } 

                this.getAlbums();
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null){
                    console.log(this.errorMessage);
                }

                this.getAlbums();
            }
        );
    }
}
