import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Direccion } from '../models/direccion';
import { Pedido } from '../models/pedido';
import { PedidoService } from '../services/pedido/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  titulo = "Nuevo Pedido";
  direccion = new Direccion();//direccion del local
  domicilio = new Direccion();//direccion del cliente
  pedidos = [];
  accion = "N" //la accion inicial es agregar un nuevo pedido
  opcion = "";
  entrega = ""; // Para elegir la fecha con un datetime (F) o elegir que sea inmediata (I)
  formaIngresoDomicilio = ""; // Para elegir la fecha con un datetime o elegir que sea inmediata
  ciudades = ["Córdoba", "Villa Carlos Paz", "Río Primero"];
  vencimiento = ""
  fechaEntrega = "";
  ciudad = this.ciudades[0];
  foto:File = null;
  ciudadMaps = null;

  loAntesPosible = false;
  submitted = false;
  submittedPago = false;

  FormPedido: FormGroup;
  FormCarrito: FormGroup;
  FormPago: FormGroup;
  FormPagoEfectivo:  FormGroup;
  FormPagoTarjeta: FormGroup;
  /*  La foto debe tener un maximo de 5MB
      Ciudades que se pueden elegir son CBA Capital, VCP y Rio Primero
      Descripcion del pedido min 5 char max 255 char
      Minimo 1 hs despues, maximo 1 semana despues para la entrega del pedido
      Horario de trabajo 8 a 00 lunes a lunes
      Direccion de COMERCIO en forma textual* o seleccionando punto en el mapa
      Direccion de ENTREGA en forma textual*
      forma textual = calle, numero, ciudad y referencia opcional en formato texto 
  */
  constructor(
    public formBuilder: FormBuilder,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.FormPedido = this.formBuilder.group({
      Ciudad:[null],
      Descripcion: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(240)]], //minimo 5 caracteres maximo 255
      CalleDomicilio: [null,  [Validators.required, Validators.minLength(5), Validators.maxLength(240)]],
      NumeroDomicilio: [null,  [Validators.required]],
      ReferenciaDomicilio: [null,  [ Validators.minLength(5), Validators.maxLength(240)]],
      CalleComercio: [null,  [Validators.required, Validators.minLength(5), Validators.maxLength(240)]],
      NumeroComercio: [null,  [Validators.required]],
      ReferenciaComercio: [null,  [ Validators.minLength(5), Validators.maxLength(240)]],

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
      Tarjeta: [null,  [Validators.required, Validators.pattern("^4[0-9]{12}(?:[0-9]{3})?$")]],
      CVV: [null, [Validators.required, Validators.pattern('[0-9]{3}')]],
      Venc: [null, [Validators.required, Validators.pattern("(0[1-9]|1[012])[-/](19|20)[0-9]{2}")]],
      Titular: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(24)]]
    });
  }

  valorAntesPosible() {
    this.loAntesPosible = !this.loAntesPosible;
  }
  
  agregarPedido() {
    if (this.FormPedido.invalid) {           
      alert("No puede proceder al carrito debido a que existen errores");
      return;
    }
    if (this.entrega == "F"){
      if (!this.validarFechaEntrega()) {
        alert("La fecha ingresada no es valida. Debe ser como minimo una hora luego de la hora actual y como maximo una semana despues.");
        return;
      }
      if (!this.validarHoraEntrega()) {
        alert("La fecha ingresada no es valida. Los pedidos se entregan entre las 8 y las 00 horas.");
        return;
      }
    }

    this.accion = 'C';
    
    this.domicilio.Ciudad = this.ciudad;
    this.domicilio.Calle = this.FormPedido.value.CalleDomicilio;
    this.domicilio.Numero = this.FormPedido.value.NumeroDomicilio;
    var nuevoPed = new Pedido();
    nuevoPed.Descripcion = this.FormPedido.value.Descripcion;
    this.domicilio.Referencia = this.FormPedido.value.ReferenciaDomicilio;
    
    this.direccion.Ciudad = this.ciudad;
    if (this.formaIngresoDomicilio == "M") {
      this.direccion.Calle = this.FormPedido.value.CalleDomicilio;
      this.direccion.Numero = this.FormPedido.value.NumeroDomicilio;
      this.direccion.Referencia = this.FormPedido.value.ReferenciaDireccion;
    }
    
    var nuevoPed = new Pedido();
    nuevoPed.Domicilio = this.domicilio;
    nuevoPed.Descripcion = this.FormPedido.value.Descripcion;
    nuevoPed.Comercio = this.direccion;
    this.pedidos.push(nuevoPed);
    this.FormCarrito.reset();
    this.submitted = true;
    this.FormPedido.markAsUntouched(); 
    console.log(nuevoPed);
  }

  agregarOtro() {
    this.accion ="N";
    this.FormPedido.reset();
    this.FormPedido.markAsUntouched(); 
    this.submitted = false;
  }

  procederAPago() {
    if (this.FormPedido.invalid) {       
      alert("No puede proceder al carrito debido a que existen errores");
      return;
    }

    if (this.entrega == "F") {
      if (!this.validarFechaEntrega()) {
        alert("La fecha ingresada no es valida. Debe ser como minimo una hora luego de la hora actual y como maximo una semana despues.");
        return;
      }
      if (!this.validarHoraEntrega()) {
        alert("La fecha ingresada no es valida. Los pedidos se entregan entre las 8 y las 00 horas.");
        return;
      }
      if (!this.validarCiudad()) {
        alert("Debe seleccionar un local dentro de la misma ciudad de su domicilio");
        return;
      }
    }
    this.accion = 'C';
    
    this.domicilio.Ciudad = this.ciudad;
    this.domicilio.Calle = this.FormPedido.value.CalleDomicilio;
    this.domicilio.Numero = this.FormPedido.value.NumeroDomicilio;
    this.domicilio.Referencia = this.FormPedido.value.ReferenciaDomicilio;
    
    this.direccion.Ciudad = this.ciudad;
    if (this.formaIngresoDomicilio == "M") {
      this.direccion.Calle = this.FormPedido.value.CalleDireccion;
      this.direccion.Numero = this.FormPedido.value.NumeroDireccion;
      this.direccion.Referencia = this.FormPedido.value.ReferenciaDireccion;
    }
    
    var nuevoPed = new Pedido();
    nuevoPed.Domicilio = this.domicilio;
    nuevoPed.Descripcion = this.FormPedido.value.Descripcion;
    nuevoPed.Comercio = this.direccion;
    nuevoPed.Imagen = this.foto;
    if (this.entrega == "I") {
      nuevoPed.FechaHora = null;
    }
    else {
      nuevoPed.FechaHora = (<HTMLInputElement>document.getElementById("FechaEntrega")).value;
    }
    this.pedidos.push(nuevoPed);
    this.accion = "P";
    this.FormPago.reset();
    this.FormPago.markAsUntouched();
    this.submitted = true;
    this.FormPedido.markAsUntouched(); 
    console.log(nuevoPed);
  }

  selecFormaPago(opcion) {
    this.opcion = opcion;
  }

  selecFormaEntrega(opcion) {
    this.entrega = opcion;
  }

  selecFormaIngresoDomicilio(opcion) {
    this.formaIngresoDomicilio = opcion;

  }

  pagar() {
    if (this.FormPago.invalid) {
      alert("No puede proceder al pago debido a que existen errores")
      return;
    }

    if (this.opcion == "E") this.pagarEfectivo();
    else this.pagarTarjeta(); 
  }

  pagarEfectivo(){
    if (this.FormPagoEfectivo.invalid) {
      alert("No puede proceder al pago debido a que existen errores")
      return;
    }
    this.pedidos[0].MontoEfectivo = this.FormPagoEfectivo.value.Monto;
    this.FormPagoEfectivo.reset();
    this.submittedPago = true;
    this.FormPagoEfectivo.markAsUntouched();
    this.pedidos[0].Efectivo = true;
    this.pedidoService.post(this.pedidos[0]).subscribe((res:any) => {
      alert("El pedido se ha realizado con exito");
      this.volver();
    });
  }

  pagarTarjeta() {
    if (this.FormPagoTarjeta.invalid) {
      alert("No puede proceder al pago debido a que existen errores");
      return;
    }
    if (!this.validarFechaTarjeta()) {
      alert("El vencimiento de la tarjeta no es valido");
      return;
    }
    this.FormPagoTarjeta.reset();
    this.submittedPago = true;
    this.FormPagoTarjeta.markAsUntouched();
    
    this.pedidos[0].Efectivo = false;
    this.pedidos[0].MontoEfectivo = null;
    this.pedidoService.post(this.pedidos[0]).subscribe((res:any) => {
      alert("El pedido se ha realizado con exito y el pago se ha procesado");    
    });
    this.volver();
  }

  volver() {
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

    this.pedidos = [];

    this.accion = "N"
    this.opcion = "";
    this.entrega = "";
    this.formaIngresoDomicilio = "";
    this.ciudad = this.ciudades[0];
    this.foto =null;
    this.fechaEntrega="";
  }

  setDireccion(event) {
    this.direccion = event;
    this.FormPedido.controls['CalleComercio'].setValue(this.direccion.Calle);
    this.FormPedido.controls['NumeroComercio'].setValue(this.direccion.Numero);
    this.FormPedido.controls['ReferenciaComercio'].setValue(this.direccion.Referencia);
    this.ciudadMaps = event.Ciudad;
  }

  selectCiudad() {
    this.ciudad = (<HTMLInputElement>document.getElementById("selectCiudad")).value;
    console.log(this.ciudad)
  }

  mostrarFoto() {
    var input = (<HTMLInputElement>document.getElementById("inputFoto"));
    this.foto = (<HTMLInputElement>document.getElementById("inputFoto")).files[0];
    var imagen = <HTMLImageElement>document.getElementById("fotoSelec");
    if (this.foto.size > 2097152 * 2.5) {
      alert("La imagen no debe pesar mas de 5MB");
      input.value = "";
      return;
   };
    imagen.src = URL.createObjectURL(this.foto); 
    imagen.style.display ="block"; 
  }

  validarFechaTarjeta(){
    var fechaActual = formatDate(new Date(), "MM/yyyy", "en-US");

    var vectorVenc = this.vencimiento.split("/", 2);
    var vectorActual = fechaActual.split("/", 2);

    var mesVenc = vectorVenc[0];
    var mesActual = vectorActual[0];

    var añoVenc = vectorVenc[1];
    var añoActual = vectorActual[1];

    if (añoVenc > añoActual) return true;
    if (añoVenc == añoActual) {
      if (mesVenc >= mesActual) return true;
    }
    return false;
  }

  validarFechaEntrega()
  {
    var fechaActual = formatDate(new Date(), "dd/MM/yyyy", "en-US");    
    var vectorFechaActual = fechaActual.split("/", 3);

    this.fechaEntrega = (<HTMLInputElement>document.getElementById("FechaEntrega")).value;
    var vectorHoraEntregaIntermedio = this.fechaEntrega.split("T", 2);
    var vectorFechaEntrega = vectorHoraEntregaIntermedio[0].split("-", 3);

    var diaEntrega: number =  +vectorFechaEntrega[2];
    var mesEntrega: number =  +vectorFechaEntrega[1];
    var añoEntrega: number =  +vectorFechaEntrega[0];

    var diaActual: number = +vectorFechaActual[0];
    var mesActual: number =  +vectorFechaActual[1];
    var añoActual: number =  +vectorFechaActual[2];
    // alert(diaEntrega.toString() + mesEntrega.toString() + añoEntrega.toString() +"   " +  diaActual + mesActual + añoActual)

    if (añoEntrega - añoActual > 0) return false;

    if (mesEntrega == 1 && mesActual == 12) { // caso enero diciembre que vuelven a contar los dias
      if (diaEntrega + 31 - diaActual > 7) return false;
      else return true;
    }

    if (mesEntrega - mesActual == 1)
    {
      if (mesEntrega == 1 || mesEntrega == 3 || mesEntrega == 5 || mesEntrega == 7 || mesEntrega == 8 || mesEntrega == 10 || mesEntrega == 12) {
        if (diaEntrega + 31 - diaActual > 7) return false; // caso que sea dia 27 y la entrega sea el 1 por ejemplo
        else return true;
      }
      if (mesEntrega == 2) {
        if (diaEntrega + 28 - diaActual > 7) return false; // No se completa año bisiesto 
        else return true;
      }

      else {
        if (diaEntrega + 30 - diaActual > 7) return false;
        else return true;
      }
    }

    if (mesEntrega == mesActual) {
      if(diaEntrega - diaActual > 7) return false;
      if(diaEntrega - diaActual >= 0 && diaEntrega - diaActual <= 7) return true;
      return false;
    }
  }

  validarHoraEntrega() {
    this.fechaEntrega = (<HTMLInputElement>document.getElementById("FechaEntrega")).value;

    var fechaActual = formatDate(new Date(), "HH:mm:ss", "en-US");
    var vectorFechaActual = fechaActual.split(":", 3);

    var fechaActualCompleta = formatDate(new Date(), "dd/MM/yyyy", "en-US");    
    var vectorFechaActualCompleta = fechaActualCompleta.split("/", 3);
    
    var vectorHoraEntregaIntermedio = this.fechaEntrega.split("T", 2);
    var vectorFechaEntrega = vectorHoraEntregaIntermedio[0].toString().split("-", 3);
    var vectorHoraEntrega = vectorHoraEntregaIntermedio[1].split(":", 2); 

    var horaEntrega: number =  +vectorHoraEntrega[0];
    var minutosEntrega: number =  +vectorHoraEntrega[1];
    var diaEntrega: number = +vectorFechaEntrega[2];

    var horaActual: number = +vectorFechaActual[0];
    var minutosActual: number =  +vectorFechaActual[1];
    var diaActual: number = +vectorFechaActualCompleta[0];

    if (horaEntrega < 8) return false; // Se trabaja de 8 a 00

    if (diaEntrega - diaActual == 0) {
      if (horaEntrega - horaActual < 1) return false;

      if (horaEntrega - horaActual > 1) return true;

      if (horaEntrega - horaActual == 1) {
        if (minutosEntrega + 60 - minutosActual < 60) return false; // MENOS DE UNA HORA
        else return true; // mas de una hora de diferencia
      }
    }
    else return true; // Si tienen mas de un dia de diferencia y no es un horario entre 00 y 8 pasa
  }

  validarCiudad() {
    if (this.formaIngresoDomicilio == "M") {
     return true; // Si se selecciono carga manual no se validara
    }
    if (this.ciudadMaps == this.ciudad) {
      return true; // Si no se selecciono carga manual, se procede a valuar que sean iguales las ciudades
    }
    return false;
  }
}
