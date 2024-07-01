import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../Models/IClient';
import { ClientInfo } from '../Models/ClientInfo';
import { LeaseReceipt } from '../Models/ILeaseReceipt';



@Injectable({
  providedIn: 'root'
})
export class arriendoService {

  private readonly baseUrl: string = environment.baseUrl;
  private readonly getClientUrl : string = environment.getClientsUrl;
  private readonly addClientUrl : string = environment.addClientUrl;
  private readonly lastLeaseReceipt : string = environment.lastLeaseReceipt;
  constructor(private http: HttpClient) {


  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + this.getClientUrl);
  }

  addClient(client:ClientInfo): Observable<Client>{
    return this.http.put<Client>((this.baseUrl + this.addClientUrl) ,client)
  }

  getLastLeaseReceiptByClient(clientId:Number):Observable<LeaseReceipt>{
    return this.http.get<LeaseReceipt>(this.baseUrl + this.lastLeaseReceipt + "/${clientId}")
  }
}
