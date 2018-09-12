import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';


@Component({
    selector: 'album-edit',
    templateUrl: '../views/album-add.html',
    providers: [
        AlbumService
    ]
})

export class AlbumEditComponent implements OnInit {

    private loading: boolean;
    private _route: ActivatedRoute;
    private _router: Router;
    private _albumService: AlbumService;

    public titulo: string;
    public album: Album;
    public errorMessage: any;

    constructor(_route: ActivatedRoute, _router: Router, _albumService: AlbumService) {
        this._route = _route;
        this._router = _router;
        this._albumService = _albumService;
    }

    ngOnInit() {
        this.titulo = 'Editar album';
        console.log("album.edit.component.ts cargado");

        this.album = new Album('', '');
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

    onSubmit() {
        // Obtengo el id desde la URL
        this._route.params.forEach((params: Params) => {

            let id = params['id'];

            this._albumService.editAlbum(id, this.album)
                .subscribe(
                    response => {
                        if (!response.album) {
                            alert("Error en el servidor");
                            return;
                        }

                        this.album = response.album;

                        this._router.navigate(['/album', id]);
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
}
