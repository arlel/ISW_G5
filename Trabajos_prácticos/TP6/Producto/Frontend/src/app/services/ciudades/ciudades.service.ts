import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  resourceUrl: string = "url";

  constructor(private httpClient: HttpClient) { }

  get(): Observable<string[]>{
    return this.httpClient.get(this.resourceUrl) as Observable<string[]>;
  }
}
