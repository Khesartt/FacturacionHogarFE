import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { arriendoService } from '../../Services/arriendo.service';
import { Client } from '../../Models/IClient';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-recibo-arriendo',
    templateUrl: './recibo-arriendo.component.html',
    styleUrls: ['./recibo-arriendo.component.css']
})

export class ReciboArriendoComponent implements OnInit {

    public formArriendo: FormGroup;
    public clients: Client[]

    constructor(private formBuilder: FormBuilder, private arriendoService: arriendoService) {

    }

    ngOnInit(): void {
        this.preloadForm();
        this.loadClients();
    }

    preloadForm() {
        this.formArriendo = new FormGroup({
            valorNumero: new FormControl(""),
            fechaRecibo: new FormControl(""),
            nombre: new FormControl(""),
            valorTexto: new FormControl(""),
            concepto: new FormControl(""),
            direccion: new FormControl(""),
            diaFI: new FormControl(""),
            mesFI: new FormControl(""),
            anioFI: new FormControl(""),
            diaFF: new FormControl(""),
            mesFF: new FormControl(""),
            anioFF: new FormControl(""),
            NumeroRecibo: new FormControl(""),
        });
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
    SaveAndPrint() {
        console.log("testing");

    }

    PreLoadForm(id: number) {
        console.log('Cliente seleccionado con ID:', id);
    }
}
