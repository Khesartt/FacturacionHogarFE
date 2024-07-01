import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { arriendoService } from '../../Services/arriendo.service';
import { Client } from '../../Models/IClient';
import { firstValueFrom } from 'rxjs';
import { FormInitializationService } from '../../Services/FormInitializationService';
import { plainToInstance } from 'class-transformer';
import { ClientInfo } from '../../Models/ClientInfo';
import { LeaseReceipt } from '../../Models/ILeaseReceipt';
import { HttpErrorResponse } from '@angular/common/http';

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
    public leaseReceipt: LeaseReceipt

    constructor(private arriendoService: arriendoService, private formInitService: FormInitializationService) {
        this.formArriendo = this.formInitService.createArriendoForm();
        this.formClient = this.formInitService.createClientForm();
    }

    ngOnInit(): void {
        this.loadClients();
    }

    async loadClients() {
        try {
            this.clients = await firstValueFrom(this.arriendoService.getClients());
        }
        catch (error) {
            console.error('Error al obtener clientes', error);
        }
    }

    async sendClient() {
        const clientInfo = plainToInstance(ClientInfo, this.formClient.value as FormGroup);

        try {
            this.client = await firstValueFrom(this.arriendoService.addClient(clientInfo));
            this.closeModal();

            console.log(this.client)
        }
        catch (error) {
            console.error('Error al añadir el cliente', error);
        }
    }

    async PreLoadForm(id: number) {
        try {
            this.leaseReceipt = await firstValueFrom(this.arriendoService.getLastLeaseReceiptByClient(id));
            console.log(this.client)
        }
        catch (error) {
            if (error instanceof HttpErrorResponse) {
                console.error('Error status:', error.status);
                console.error('Error message:', error.message);
                // Puedes manejar diferentes estados de error aquí
                if (error.status === 404) {
                    console.error('Lease receipt not found');
                } else if (error.status === 500) {
                    console.error('Internal server error');
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
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
            console.error('formClientModal element not found!');
            return;
        }

        const myModal = bootstrap.Modal.getInstance(modalElement);
        if (!myModal) {
            console.error('formClientModal instance not found!');
            return;
        }

        this.formClient.reset();
        myModal.hide();
    }

    send() {
        console.log("enviando data");

    }

    resetData() {
        console.log("boton de borrado");
    }
    printData() {
        console.log("imprimir data");
    }
}