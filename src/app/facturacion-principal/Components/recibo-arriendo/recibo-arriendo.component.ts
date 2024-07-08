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
import { LeaseReceiptInfo } from '../../Models/LeaseReceiptInfo';

declare var bootstrap: any;

@Component({
    selector: 'app-recibo-arriendo',
    templateUrl: './recibo-arriendo.component.html',
    styleUrls: ['./recibo-arriendo.component.css']
})

export class ReciboArriendoComponent implements OnInit {

    formArriendo: FormGroup;
    formClient: FormGroup;

    public clients: Client[];
    public client: Client;
    public leaseReceipt: LeaseReceipt;
    private currentClientId: number;

    constructor(private arriendoService: arriendoService, private formInitService: FormInitializationService) {
        this.formArriendo = this.formInitService.createArriendoForm();
        this.formClient = this.formInitService.createClientForm();
    }

    ngOnInit(): void {
    }

    resetForm() {
        this.formArriendo.reset();
        this.currentClientId = 0;
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

    async PreLoadForm(id: number, names: string) {
        try {
            var leaseReceipt = await firstValueFrom(this.arriendoService.getLastLeaseReceiptByClient(id));
            this.formArriendo = this.formInitService.preloadArriendoForm(leaseReceipt);
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 404) {
                    this.formArriendo = this.formInitService.preloadEmptyArriendoForm(names);
                }
                else if (error.status === 500) {
                    console.error('Internal server error');
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }

        this.currentClientId = id;
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

    send(isPrint: boolean) {
        console.log(this.formArriendo.value)
        const formValues = this.formArriendo.value;

        // Usa plainToInstance para convertir los datos del formulario al modelo
        const leaseReceiptInfoInstance = plainToInstance(LeaseReceiptInfo, {
            ...formValues,
            receiptDate: formValues.fechaRecibo,
            startDate: `${formValues.anioFI}-${formValues.mesFI}-${formValues.diaFI}`,
            endDate: `${formValues.anioFF}-${formValues.mesFF}-${formValues.diaFF}`
          });    
        console.log(leaseReceiptInfoInstance);
    }
}