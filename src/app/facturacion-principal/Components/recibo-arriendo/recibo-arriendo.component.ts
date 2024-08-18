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
import { LeaseReceiptType } from '../../Models/enumerators/LeaseReceiptType';

declare var bootstrap: any;

@Component({
    selector: 'app-recibo-arriendo',
    templateUrl: './recibo-arriendo.component.html',
    styleUrls: ['./recibo-arriendo.component.css']
})

export class ReciboArriendoComponent implements OnInit {

    public formArriendo: FormGroup;
    public formClient: FormGroup;
    public formService: FormGroup;

    public LeaseReceiptType = LeaseReceiptType;

    public clients: Client[];
    public client: Client;
    public leaseReceipt: LeaseReceipt;
    public isLoading = false;

    private currentClientId: number = 0;
    private currentReceiptId: number = 0;

    private currentServiceClientId: number = 0;
    private currentServiceReceiptId: number = 0;

    constructor(private arriendoService: arriendoService, private formInitService: FormInitializationService) {
        this.formArriendo = this.formInitService.createLeaseBasicForm();
        this.formService = this.formInitService.createLeaseBasicForm();
        this.formClient = this.formInitService.createClientForm();
    }

    ngOnInit(): void {

        document.querySelectorAll('.flip-button').forEach(button => {
            button.addEventListener('click', () => {
              const cardWrapper = button.closest('.card-wrapper');
              cardWrapper?.classList.toggle('flipped');
            });
          });

        this.loadClients();  
    }

    resetArriendoForm() {
        this.formArriendo.reset();
        this.currentClientId = 0;
        this.currentReceiptId = 0;
    }

    resetServiceForm() {
        this.formService.reset();
        this.currentServiceClientId = 0;
        this.currentServiceReceiptId = 0;
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

    async PreLoadForm(id: number, names: string, leaseReceiptType: string) {
        try {
            var leaseReceipt = await firstValueFrom(this.arriendoService.getLastLeaseReceiptByClient(id,leaseReceiptType));
            console.log(leaseReceiptType);

            if(leaseReceiptType === LeaseReceiptType.Rent){
                this.formArriendo = this.formInitService.preloadArriendoForm(leaseReceipt);
                this.currentReceiptId = leaseReceipt.receiptId;
                this.currentClientId = id;

            }
            else{
                this.formService = this.formInitService.preloadArriendoForm(leaseReceipt);
                this.currentServiceReceiptId = leaseReceipt.receiptId;
                this.currentServiceClientId = id;
            }
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 404) {

                    if(leaseReceiptType === LeaseReceiptType.Rent){
                        this.formArriendo = this.formInitService.preloadEmptyArriendoForm(names);
                        this.currentReceiptId = 0;
                        this.currentClientId = id;

                    }
                    else{
                        this.formService = this.formInitService.preloadEmptyArriendoForm(names);
                        this.currentServiceReceiptId = 0;
                        this.currentServiceClientId = id;
                    }
                }
                else if (error.status === 500) {
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

    async send(isSaveLeisure: boolean, leaseReceiptType:string) {
        this.isLoading = true;

        try {
            this.SetLastReceiptToSend(isSaveLeisure, leaseReceiptType);

            const leaseReceiptFile = await firstValueFrom(this.arriendoService.saveLeaseReceipt(this.leaseReceipt));
            console.log(leaseReceiptFile);
            this.downloadFile(leaseReceiptFile);
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }


    SetLastReceiptToSend(isSaveLeisure: boolean, receiptType:string) {
        let anioFI: number, mesFI: number, diaFI: number, anioFF: number, mesFF: number, diaFF: number;
        let fechaRecibo: string, nombre: string, valorNumero: number, NumeroRecibo: string, valorTexto: string, concepto: string, direccion: string;

        if(receiptType === LeaseReceiptType.Rent){
            ({ anioFI, mesFI, diaFI, anioFF, mesFF, diaFF, fechaRecibo, nombre, valorNumero, NumeroRecibo, valorTexto, concepto, direccion } = this.formArriendo.value);
        }
        else{
            ({ anioFI, mesFI, diaFI, anioFF, mesFF, diaFF, fechaRecibo, nombre, valorNumero, NumeroRecibo, valorTexto, concepto, direccion } = this.formService.value);
        }


        const startDateAdjust = new Date(anioFI, mesFI - 1, diaFI);
        const endDateAdjust = new Date(anioFF, mesFF - 1, diaFF);

        const [day, month, year] = fechaRecibo.split('-').map(Number);
        const receiptDateAdjust = new Date(year, month - 1, day);

        const details = this.getReceiptDetails(receiptType);

        this.leaseReceipt = {
            receiptId: details.receiptId,
            idClient: details.clientId,
            clientName: nombre,
            leaseAmount: valorNumero,
            receiptNumber: NumeroRecibo,
            leaseAmountInWords: valorTexto,
            leaseDescription: concepto,
            leaseAddress: direccion,
            receiptDate: receiptDateAdjust,
            startDate: startDateAdjust,
            endDate: endDateAdjust,
            shouldSave: isSaveLeisure,
            leaseReceiptType: receiptType
        };
    }

    getReceiptDetails(receiptType: string): { receiptId: number, clientId: number } {
        let receiptId = 0;
        let clientId = 0;
    
        switch (receiptType) {
            case LeaseReceiptType.Service:
                receiptId = this.currentServiceReceiptId;
                clientId = this.currentServiceClientId;
                break;
            default:
                receiptId = this.currentReceiptId;
                clientId = this.currentClientId;
                break;
        }
    
        return { receiptId, clientId };
    }
    

    downloadFile(leaseReceiptFile: LeaseReceiptFile) {
        const base64Data = leaseReceiptFile.fileContent;
        const fileType = leaseReceiptFile.fileType;
        const fileName = leaseReceiptFile.fileName;

        console.log(base64Data);
    
        const binaryString = window.atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
    
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
    
        const blob = new Blob([bytes], { type: fileType });
    
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}