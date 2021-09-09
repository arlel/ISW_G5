import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  Titulo = "Nuevo Pedido";

  FormPedido: FormGroup;


  constructor(
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.FormPedido = this.formBuilder.group({
      Descripcion: [null],
      Domicilio: [null],
      Comercio: [null]

    });
  }

}
