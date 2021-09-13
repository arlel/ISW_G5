import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert } from 'selenium-webdriver';
import { Direccion } from '../models/direccion';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  Titulo = "Nuevo Pedido";
  Direccion = new Direccion();
  Pedidos = [];
  Accion = "N" //la accion inicial es agregar un nuevo pedido
  Opcion = "";
  Entrega = ""; // Para elegir la fecha con un datetime o elegir que sea inmediata
  FormaIngresoDomicilio = ""; // Para elegir la fecha con un datetime o elegir que sea inmediata



  LoAntesPosible = false;
  submitted = false;
  submittedPago = false;


  FormPedido: FormGroup;
  FormCarrito: FormGroup;
  FormPago: FormGroup;
  FormPagoEfectivo:  FormGroup;
  FormPagoTarjeta: FormGroup;
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
      Descripcion: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(240)]], //minimo 5 caracteres maximo 255
      Domicilio: [null,  [Validators.required, Validators.minLength(5), Validators.maxLength(240)]],
      Comercio: [null,  [Validators.required, Validators.minLength(5), Validators.maxLength(240)]] 

    });

    this.FormCarrito = this.formBuilder.group({
      Descripcion: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(240)]], //minimo 5 caracteres maximo 255
      Domicilio: [null,  [Validators.required, Validators.minLength(5), Validators.maxLength(240)]],
      Comercio: [null,  [Validators.required, Validators.minLength(5), Validators.maxLength(240)]] 

    });

    this.FormPago = this.formBuilder.group({
    });

    this.FormPagoEfectivo = this.formBuilder.group({
      Monto: [null,  [Validators.required, Validators.pattern('[0-9]{1,10}')]]
    });

    this.FormPagoTarjeta = this.formBuilder.group({
      Tarjeta: [null,  [Validators.required,  Validators.pattern("^4[0-9]{12}(?:[0-9]{3})?$")]],
      CVV:[null, [Validators.required, Validators.pattern('[0-9]{3}')]],
      Venc:[null, [Validators.required, Validators.pattern("(0[1-9]|1[012])[-/](19|20)[0-9]{2}")]],
      Titular:[null, [Validators.required, Validators.minLength(5), Validators.maxLength(24)]]
    });
  }

  ValorAntesPosible(){
    this.LoAntesPosible = !this.LoAntesPosible;
  }
  AgregarPedido(){
    if (this.FormPedido.invalid) {
      alert("No puede proceder al carrito debido a que existen errores")
      return;
    }
    this.Accion = 'C';
    var nuevoPed = new Pedido();
    nuevoPed.Domicilio = this.FormPedido.value.Domicilio;
    nuevoPed.Descripcion = this.FormPedido.value.Descripcion;
    nuevoPed.Comercio = this.FormPedido.value.Comercio;
    this.Pedidos.push(nuevoPed);
    this.FormCarrito.reset();
    this.submitted = true;
    this.FormPedido.markAsUntouched(); 
  }

  AgregarOtro(){
    this.Accion ="N";
    this.FormPedido.reset();
    this.FormPedido.markAsUntouched(); 
    this.submitted = false;

  }

  ProcederAPago(){
    this.Accion = "P";
    this.FormPago.reset();
    this.FormPago.markAsUntouched();
  }

  SelecFormaPago(opcion){
    this.Opcion = opcion;
  }

  SelecFormaEntrega(opcion){
    this.Entrega = opcion;
  }

  SelecFormaIngresoDomicilio(opcion){
    this.FormaIngresoDomicilio = opcion;

  }

  Pagar(){
    if (this.FormPago.invalid) {
      alert("No puede proceder al pago debido a que existen errores")
      return;
    }

    if (this.Opcion == "E") this.PagarEfectivo();
    else this.PagarTarjeta();

   
  }

    PagarEfectivo(){
      if (this.FormPagoEfectivo.invalid) {
        alert("No puede proceder al pago debido a que existen errores")
        return;
      }
      this.FormPagoEfectivo.reset();
      this.submittedPago = true;
      this.FormPagoEfectivo.markAsUntouched();
      alert("El pedido se ha realizado con exito");
      this.Volver();
    }
    PagarTarjeta(){
      if (this.FormPagoTarjeta.invalid) {
      alert("No puede proceder al pago debido a que existen errores")
      return;
    }
    this.FormPagoTarjeta.reset();
    this.submittedPago = true;
    this.FormPagoTarjeta.markAsUntouched();
    alert("El pedido se ha realizado con exito y el pago se ha procesado")
    this.Volver();
  }

  Volver(){
    this.FormPago.reset();
    this.FormPedido.reset();
    this.FormCarrito.reset();
    this.FormPagoEfectivo.reset();
    this.FormPagoTarjeta.reset();
    this.FormPago.markAsUntouched();   
    this.FormPedido.markAsUntouched();   
    this.FormCarrito.markAsUntouched();
    this.FormPagoEfectivo.markAsUntouched();
    this.FormPagoTarjeta.markAsUntouched();

    this.submittedPago = false;
    this.submitted = false;

    this.Pedidos = [];

    this.Accion = "N"
    this.Opcion = "";
    this.Entrega = "";
    this.FormaIngresoDomicilio = "";





  }

}
