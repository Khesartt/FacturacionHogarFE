import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../Models/IClient';



@Injectable({
  providedIn: 'root'
})
export class arriendoService {

  private readonly baseUrl: string = environment.baseUrl;
  private readonly getClientUrl : string = environment.getClientsUrl;
  
  constructor(private http: HttpClient) {


  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + this.getClientUrl);
  }

}
