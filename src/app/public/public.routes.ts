import { Routes } from "@angular/router";
import { InicioComponent } from './inicio/inicio.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { ProductosComponent } from './productos/productos.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { PrincipalComponent } from './principal/principal.component';
export const publico: Routes = [
    {
        path: '',
        component: PrincipalComponent,
        children: [
            { path: '', redirectTo: 'principal', pathMatch: 'full' },
            { path: 'principal', component: InicioComponent },
            { path: 'inicio', component: InicioComponent },
            { path: 'empresa', component: EmpresaComponent },
            { path: 'productos', component: ProductosComponent },
            { path: 'cotizacion', component: CotizacionComponent }
        ]
    }
];