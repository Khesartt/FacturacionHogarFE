import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class FormInitializationService {
  constructor(private fb: FormBuilder) {}

  createArriendoForm(): FormGroup {
    return this.fb.group({
      valorNumero: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      fechaRecibo: ["", Validators.required],
      nombre: ["", Validators.required],
      valorTexto: ["", Validators.required],
      concepto: ["", Validators.required],
      direccion: ["", Validators.required],
      diaFI: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      mesFI: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      anioFI: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      diaFF: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      mesFF: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      anioFF: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      NumeroRecibo: ["", [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  createClientForm(): FormGroup {
    return this.fb.group({
      fullName: ["", Validators.required],
      identification: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }
}
