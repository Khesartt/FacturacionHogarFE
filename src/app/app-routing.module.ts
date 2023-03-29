import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import { HomeComponent } from './public/components/home/home.component';

const routes: Routes = [
    {
        path: 'facturacion',
        loadChildren: () => import ('./facturacion-principal/facturacion-principal.module').then(m => m.FacturacionPrincipalModule)
    },{
      path: 'home',
      component:HomeComponent
  }, {
        path: '**',
        component: HomeComponent
    }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
