import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { PedidoComponent } from './pedido/pedido.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/pedido', pathMatch: 'full'},
  { path: 'pedido', component: PedidoComponent},
  { path: 'about-us', component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
