import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DatosTarjeta } from 'src/app/models/datos_tarjeta';

@Injectable({
  providedIn: 'root'
})
export class VisaService {
  resourceUrl: string = "url";

  constructor() { }

  validate(datos: DatosTarjeta): Observable<boolean>{
    //Validación tarjeta Visa (inicia con "4")
    let ok = datos.Numero.toString()[0] == "4"; 
    return of(ok);
  }
}
