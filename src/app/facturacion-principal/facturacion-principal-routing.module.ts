import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavFacturacionComponent} from './Components/nav-facturacion/nav-facturacion.component';
import {ReciboArriendoComponent} from './Components/recibo-arriendo/recibo-arriendo.component';
import {ReciboEgresoComponent} from './Components/recibo-egreso/recibo-egreso.component';

const routes: Routes = [{
        path: '',
        children: [
            {
                path: 'facturacionArriendo',
                component: ReciboArriendoComponent
            }, {
                path: 'facturacionEgreso',
                component: ReciboEgresoComponent
            }, {
                path: '**',
                redirectTo: 'facturacionArriendo'
            }
        ]

    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FacturacionPrincipalRoutingModule {}
