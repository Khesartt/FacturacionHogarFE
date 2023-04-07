import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../Models/ICliente';



@Injectable({
  providedIn: 'root'
})
export class arriendoService {

private baseUrl:string=environment.baseUrl;

constructor(private http:HttpClient){


}

getClients():Observable<Cliente[]>{
return this.http.get<Cliente[]>(this.baseUrl+"/api/Cliente/ObtenerTodosLosClientes");
}

}
