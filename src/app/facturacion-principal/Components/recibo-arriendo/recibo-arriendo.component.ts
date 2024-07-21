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
import { LeaseReceiptFile } from '../../Models/LeaseReceiptFile';

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
    public isLoading = false;

    private currentClientId: number = 0;
    private currentReceiptId: number = 0;

    constructor(private arriendoService: arriendoService, private formInitService: FormInitializationService) {
        this.formArriendo = this.formInitService.createArriendoForm();
        this.formClient = this.formInitService.createClientForm();
    }

    ngOnInit(): void {
    }

    resetForm() {
        this.formArriendo.reset();
        this.currentClientId = 0;
        this.currentReceiptId = 0;
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
            console.log(leaseReceipt);
            this.formArriendo = this.formInitService.preloadArriendoForm(leaseReceipt);
            this.currentReceiptId = leaseReceipt.receiptId;
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 404) {
                    this.formArriendo = this.formInitService.preloadEmptyArriendoForm(names);
                    this.currentReceiptId = 0;
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

    async send(isSaveLeisure: boolean) {
        this.isLoading = true;

        try {
            this.SetLastReceiptToSend(isSaveLeisure);

            const leaseReceiptFile = await firstValueFrom(this.arriendoService.saveLeaseReceipt(this.leaseReceipt));
            console.log(leaseReceiptFile);
            this.downloadFile(leaseReceiptFile);
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }


    SetLastReceiptToSend(isSaveLeisure: boolean) {
        const { anioFI, mesFI, diaFI, anioFF, mesFF, diaFF, fechaRecibo, nombre, valorNumero, NumeroRecibo, valorTexto, concepto, direccion } = this.formArriendo.value;

        const startDateAdjust = new Date(anioFI, mesFI - 1, diaFI);
        const endDateAdjust = new Date(anioFF, mesFF - 1, diaFF);

        const [day, month, year] = fechaRecibo.split('-').map(Number);
        const receiptDateAdjust = new Date(year, month - 1, day);

        this.leaseReceipt = {
            receiptId: this.currentReceiptId,
            idClient: this.currentClientId,
            clientName: nombre,
            leaseAmount: valorNumero,
            receiptNumber: NumeroRecibo,
            leaseAmountInWords: valorTexto,
            leaseDescription: concepto,
            leaseAddress: direccion,
            receiptDate: receiptDateAdjust,
            startDate: startDateAdjust,
            endDate: endDateAdjust,
            shouldSave: isSaveLeisure
        };
    }

    downloadFile(leaseReceiptFile: LeaseReceiptFile) {
        const base64Data = leaseReceiptFile.fileContent;
        const fileType = leaseReceiptFile.fileType;
        const fileName = leaseReceiptFile.fileName;

        console.log(base64Data);
    
        // Decodifica el base64 a una cadena binaria
        const binaryString = window.atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
    
        // Convierte la cadena binaria en un array de bytes
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
    
        // Crea un Blob a partir del array de bytes
        const blob = new Blob([bytes], { type: fileType });
    
        // Crea un URL para el Blob y descarga el archivo
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
    
        // Limpia el DOM y libera el objeto URL
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}