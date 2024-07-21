import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionPrincipalRoutingModule } from './facturacion-principal-routing.module';
import { ReciboArriendoComponent } from './Components/recibo-arriendo/recibo-arriendo.component';
import { ReciboEgresoComponent } from './Components/recibo-egreso/recibo-egreso.component';
import { NavFacturacionComponent } from './Components/nav-facturacion/nav-facturacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReciboArriendoComponent,
    ReciboEgresoComponent,
    NavFacturacionComponent
  ],
  imports: [
    CommonModule,
    FacturacionPrincipalRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FacturacionPrincipalModule { }
