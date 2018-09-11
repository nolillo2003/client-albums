import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsListComponent } from './components/albums-list.component';

const appRoutes: Routes = [
    {path: '', component: AlbumsListComponent}, // Ruta por defecto
    {path: '**', component: AlbumsListComponent}, // Ruta sino existe la ruta
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);