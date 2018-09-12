import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';


@Component({
    selector: 'albums-detail',
    templateUrl: '../views/album-detail.html',
    providers: [
        AlbumService
    ]
})

export class AlbumDetailComponent implements OnInit {

    private _route: ActivatedRoute;
    private _router: Router;
    private _albumService: AlbumService;
    private loading: boolean;

    public album: Album;
    public errorMessage: any;

    constructor(_route: ActivatedRoute, _router: Router, _albumService: AlbumService) {
        this._route = _route;
        this._router = _router;
        this._albumService = _albumService;
    }

    ngOnInit() {
        console.log("Album-detail.component.ts cargado");

        // Al iniciar cargamos los albums desde la API
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
}
