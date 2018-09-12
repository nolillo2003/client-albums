import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsListComponent } from './components/albums-list.component';
import { AlbumAddComponent } from './components/album.add.component';
import { AlbumDetailComponent } from './components/album-detail.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { ImageAddComponent } from './components/image-add.component';

const appRoutes: Routes = [
    {path: '', component: AlbumsListComponent}, // Ruta por defecto
    {path: 'crear-album', component: AlbumAddComponent},
    {path: 'album/:id', component: AlbumDetailComponent},
    {path: 'editar-album/:id', component: AlbumEditComponent},
    {path: 'agregar-imagen', component: ImageAddComponent},
    {path: '**', component: AlbumsListComponent} // Ruta sino existe la ruta
    
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);