import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaseReceipt } from '../Models/ILeaseReceipt';

@Injectable({
  providedIn: 'root'
})

export class FormInitializationService {
  constructor(private fb: FormBuilder) { }

  formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };


  createLeaseBasicForm(): FormGroup {
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
      fullName: ["", [Validators.required, Validators.pattern("^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+([a-zA-ZáéíóúñÁÉÍÓÚÑ'\\s]*[a-zA-ZáéíóúñÁÉÍÓÚÑ])?$")]],
      identification: ["", [Validators.required, Validators.pattern("^[0-9]{0,10}$")]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9]{0,10}$")]]
    });
  }

  preloadArriendoForm(leaseReceipt: LeaseReceipt): FormGroup {
    const receiptDate = leaseReceipt.receiptDate instanceof Date ? leaseReceipt.receiptDate : new Date(leaseReceipt.receiptDate);
    const startDate = leaseReceipt.startDate instanceof Date ? leaseReceipt.startDate : new Date(leaseReceipt.startDate);
    const endDate = leaseReceipt.endDate instanceof Date ? leaseReceipt.endDate : new Date(leaseReceipt.endDate);

    return this.fb.group({
      valorNumero: [leaseReceipt.leaseAmount || "", [Validators.required, Validators.pattern("^[0-9]*$")]],
      fechaRecibo: [this.formatDate(receiptDate), Validators.required],
      nombre: [leaseReceipt.clientName || "", Validators.required],
      valorTexto: [leaseReceipt.leaseAmountInWords || "", Validators.required],
      concepto: [leaseReceipt.leaseDescription || "", Validators.required],
      direccion: [leaseReceipt.leaseAddress || "", Validators.required],
      diaFI: [startDate.getDate().toString(), [Validators.required, Validators.pattern("^[0-9]*$")]],
      mesFI: [(startDate.getMonth() + 1).toString(), [Validators.required, Validators.pattern("^[0-9]*$")]],
      anioFI: [startDate.getFullYear().toString(), [Validators.required, Validators.pattern("^[0-9]*$")]],
      diaFF: [endDate.getDate().toString(), [Validators.required, Validators.pattern("^[0-9]*$")]],
      mesFF: [(endDate.getMonth() + 1).toString(), [Validators.required, Validators.pattern("^[0-9]*$")]],
      anioFF: [endDate.getFullYear().toString(), [Validators.required, Validators.pattern("^[0-9]*$")]],
      NumeroRecibo: [leaseReceipt.receiptNumber || "", [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  preloadEmptyArriendoForm(names: string): FormGroup {
    const currentDate = new Date();
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

    return this.fb.group({
      valorNumero: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      fechaRecibo: [this.formatDate(currentDate), Validators.required],
      nombre: [names, Validators.required],
      valorTexto: ["", Validators.required],
      concepto: ["", Validators.required],
      direccion: ["", Validators.required],
      diaFI: [currentDate.getDate().toString(), [Validators.required, Validators.pattern("^[0-9]*$")]],
      mesFI: [(currentDate.getMonth() + 1).toString(), [Validators.required, Validators.pattern("^[0-9]*$")]],
      anioFI: [currentDate.getFullYear().toString(), [Validators.required, Validators.pattern("^[0-9]*$")]],
      diaFF: [nextMonthDate.getDate().toString(), [Validators.required, Validators.pattern("^[0-9]*$")]],
      mesFF: [(nextMonthDate.getMonth() + 1).toString(), [Validators.required, Validators.pattern("^[0-9]*$")]],
      anioFF: [nextMonthDate.getFullYear().toString(), [Validators.required, Validators.pattern("^[0-9]*$")]],
      NumeroRecibo: ["1", [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }


}
