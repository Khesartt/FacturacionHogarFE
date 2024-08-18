import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../Models/IClient';
import { ClientInfo } from '../Models/ClientInfo';
import { LeaseReceipt } from '../Models/ILeaseReceipt';
import { LeaseReceiptFile } from '../Models/LeaseReceiptFile';



@Injectable({
  providedIn: 'root'
})
export class arriendoService {

  private readonly baseUrl: string = environment.baseUrl;
  private readonly getClientUrl: string = environment.getClientsUrl;
  private readonly addClientUrl: string = environment.addClientUrl;
  private readonly lastLeaseReceipt: string = environment.lastLeaseReceipt;
  constructor(private http: HttpClient) {

  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + this.getClientUrl);
  }

  addClient(client: ClientInfo): Observable<Client> {
    return this.http.put<Client>((this.baseUrl + this.addClientUrl), client)
  }

  getLastLeaseReceiptByClient(clientId: Number,leaseReceiptType: string ): Observable<LeaseReceipt> {
    return this.http.get<LeaseReceipt>(this.baseUrl + this.lastLeaseReceipt + "/GetLastReceipt/" + clientId +"/" +leaseReceiptType)
  }

  saveLeaseReceipt(leaseReceipt: LeaseReceipt): Observable<LeaseReceiptFile> {
    return this.http.post<LeaseReceiptFile>(this.baseUrl + this.lastLeaseReceipt + "/SaveLeaseReceipt", leaseReceipt);
  }
}
