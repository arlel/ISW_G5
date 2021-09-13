import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PedidoComponent } from './pedido/pedido.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GMapsComponent } from './g-maps/g-maps.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PedidoComponent,
    AboutUsComponent,
    GMapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDUpJIfYIGj2XYFZsmqdyQygHStR0cPuuA',
      libraries: ['places']
    }),
    CommonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/pedido', pathMatch: 'full' },
      { path: 'pedido', component: PedidoComponent },
      { path: 'about-us', component: AboutUsComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
