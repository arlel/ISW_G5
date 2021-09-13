import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  Titulo = "Nuevo Pedido";
  Pedidos = [];
  Accion = "N" //la accion inicial es agregar un nuevo pedido
  Opcion = "";

  FormPedido: FormGroup;
  FormCarrito: FormGroup;
  FormPago: FormGroup;
  //   La foto debe tener un maximo de 5MB
  // Ciudades que se pueden elegir son CBA Capital, VCP y Rio Primero
  // Descripcion del pedido min 5 char max 255 char
  // Minimo 1 hs despues, maximo 1 semana despues para la entrega del pedido
  // Horario de trabajo 8 a 00 lunes a lunes
  // Direccion de COMERCIO en forma textual* o seleccionando punto en el mapa
  // Direccion de ENTREGA en forma textual*
    // * forma textual = calle, numero, ciudad y referencia opcional en formato texto 
  constructor(
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.FormPedido = this.formBuilder.group({
      Descripcion: [null], //minimo 5 caracteres maximo 255
      Domicilio: [null],
      Comercio: [null]

    });

    this.FormCarrito = this.formBuilder.group({
      Descripcion: [null], //minimo 5 caracteres maximo 255
      Domicilio: [null],
      Comercio: [null]

    });

    this.FormPago = this.formBuilder.group({
      Monto: [null],
      Tarjeta: [null],
      CVV:[null],
      Venc:[null],
      Titular:[null]
    });
  }

  AgregarPedido(){
    this.Accion = 'C';
    var nuevoPed = new Pedido();
    nuevoPed.Domicilio = this.FormPedido.value.Domicilio;
    nuevoPed.Descripcion = this.FormPedido.value.Descripcion;
    nuevoPed.Comercio = this.FormPedido.value.Comercio;
    this.Pedidos.push(nuevoPed);
    this.FormCarrito.reset();
  }

  AgregarOtro(){
    this.Accion ="N";
    this.FormPedido.reset();
  }

  ProcederAPago(){
    this.Accion = "P";
    this.FormPago.reset();
  }

  SelecFormaPago(opcion){
    this.Opcion = opcion;
  }

  Pagar(){
    //WIP
  }

}
