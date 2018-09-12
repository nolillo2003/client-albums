import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// Cargamos las rutas que hemos definido previamente
import { routing, appRoutingProviders } from './app.routing';

// Componentes propios
import { AlbumsListComponent } from './components/albums-list.component';
import { AlbumAddComponent } from './components/album.add.component';
import { AlbumDetailComponent } from './components/album-detail.component';
import { AlbumEditComponent } from './components/album-edit.component';

import { ImageAddComponent } from './components/image-add.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsListComponent,
    AlbumAddComponent,
    AlbumDetailComponent,
    AlbumEditComponent,
    ImageAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
