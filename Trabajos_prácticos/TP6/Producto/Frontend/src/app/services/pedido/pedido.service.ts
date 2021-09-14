import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';

@Injectable()
export class PedidoService {
  resourceUrl: string = "http://127.0.0.1:5000/pedidos/RealizarPedido";

  constructor(private httpClient: HttpClient) { }

  post(pedido: Pedido){
    return this.httpClient.post(this.resourceUrl, pedido);
  }
}
