import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsListComponent } from './components/albums-list.component';
import { AlbumAddComponent } from './components/album.add.component';
import { AlbumDetailComponent } from './components/album-detail.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { ImageAddComponent } from './components/image-add.component';
import { ImageEditComponent } from './components/image-edit.component';
import { ImageDetailComponent } from './components/image-detail.component';

const appRoutes: Routes = [
    {path: '', component: AlbumsListComponent}, // Ruta por defecto
    {path: 'crear-album', component: AlbumAddComponent},
    {path: 'album/:id', component: AlbumDetailComponent},
    {path: 'editar-album/:id', component: AlbumEditComponent},
    {path: 'agregar-imagen/:album', component: ImageAddComponent},
    {path: 'editar-imagen/:id', component: ImageEditComponent},
    {path: 'ver-imagen/:id', component: ImageDetailComponent},
    {path: '**', component: AlbumsListComponent} // Ruta sino existe la ruta
    
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);