import {
    Component, OnInit
}
from '@angular/core';
import {
    FormBuilder, FormControl, FormGroup
}
from '@angular/forms';
import {
    environment
}
from 'src/environments/environment';
import { arriendoService } from '../../Services/arriendo.service';

@Component({ selector: 'app-recibo-arriendo', templateUrl: './recibo-arriendo.component.html', styleUrls: ['./recibo-arriendo.component.css'] }) export class ReciboArriendoComponent implements OnInit {

    public formArriendo: FormGroup;


    constructor(private formBuilder:FormBuilder,private arriendoService:arriendoService) {

    }

    ngOnInit():void {
        this.preloadForm();

    }

    preloadForm() {
        this.formArriendo = new FormGroup({ valorNumero: new FormControl(""), fechaRecibo: new FormControl(""), nombre: new FormControl(""), valorTexto: new FormControl(""), concepto: new FormControl(""), direccion: new FormControl(""), diaFI: new FormControl(""), mesFI: new FormControl(""), anioFI: new FormControl(""), diaFF: new FormControl(""), mesFF: new FormControl(""), anioFF: new FormControl(""), NumeroRecibo: new FormControl(""), });
    }
    send() {
        console.log("enviando data");
        this.arriendoService.getClients().subscribe(resp =>{
          console.log("prueba de respuesta",resp);
        });
    }

    generarData() {
        console.log("boton de generar");
    }
    resetData() {
        console.log("boton de borrado");
    }
    printData() {
        console.log("imprimir data");
    }
}
