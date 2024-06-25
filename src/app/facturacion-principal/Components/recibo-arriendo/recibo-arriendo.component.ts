import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { arriendoService } from '../../Services/arriendo.service';
import { Client } from '../../Models/IClient';
import { firstValueFrom } from 'rxjs';
import { FormInitializationService } from '../../Services/FormInitializationService';
import { plainToInstance } from 'class-transformer';
import { ClientInfo } from '../../Models/ClientInfo';

declare var bootstrap: any;

@Component({
    selector: 'app-recibo-arriendo',
    templateUrl: './recibo-arriendo.component.html',
    styleUrls: ['./recibo-arriendo.component.css']
})

export class ReciboArriendoComponent implements OnInit {

    formArriendo: FormGroup;
    formClient: FormGroup;
    
    public clients: Client[]
    public client: Client

    constructor(private arriendoService: arriendoService, private formInitService: FormInitializationService) {
        this.formArriendo = this.formInitService.createArriendoForm();
        this.formClient = this.formInitService.createClientForm();
    }

    ngOnInit(): void {
        this.loadClients();
    }

    send() {
        console.log("enviando data");

    }

    async loadClients() {
        try {
            this.clients = await firstValueFrom(this.arriendoService.getClients());
        } catch (error) {
            console.error('Error al obtener clientes', error);
        }
    }

    resetData() {
        console.log("boton de borrado");
    }
    printData() {
        console.log("imprimir data");
    }
    async sendClient() {
        const clientInfo = this.castToClientInfo(this.formClient.value);
        try {
            this.client = await firstValueFrom(this.arriendoService.addClient(clientInfo));

            this.closeModal();
            console.log(this.client)
        } catch (error) {
            console.error('Error al añadir el cliente', error);
        }
    }


    PreLoadForm(id: number) {
        console.log('Cliente seleccionado con ID:', id);
    }

    castToClientInfo(formValue: FormGroup): ClientInfo {
        return plainToInstance(ClientInfo, formValue);
    }

    openModal() {
        const modalElement = document.getElementById('formClientModal');
        if (modalElement) {
          const myModal = new bootstrap.Modal(modalElement, {
            keyboard: false
          });
          myModal.show();
        } else {
          console.error('Modal element not found!');
        }
      }

      closeModal() {
        const modalElement = document.getElementById('formClientModal');
        if (!modalElement) {
            console.error('Modal element not found!');
            return;
        }
    
        const myModal = bootstrap.Modal.getInstance(modalElement);
        if (!myModal) {
            console.error('Modal instance not found!');
            return;
        }
    
        this.formClient.reset();
        myModal.hide();
    }
}