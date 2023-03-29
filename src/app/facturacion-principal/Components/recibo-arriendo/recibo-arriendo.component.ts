import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recibo-arriendo',
  templateUrl: './recibo-arriendo.component.html',
  styleUrls: ['./recibo-arriendo.component.css']
})
export class ReciboArriendoComponent implements OnInit {

public formArriendo:FormGroup;


  constructor(private formBuilder:FormBuilder) {



  }

  ngOnInit(): void {
this.preloadForm();
  }

  preloadForm(){
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
  send(){

  }
}
