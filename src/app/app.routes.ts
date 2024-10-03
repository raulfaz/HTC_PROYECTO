import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { ProductosComponent } from './productos/productos.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';

export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component:InicioComponent},
    {path: 'empresa', component:EmpresaComponent},
    {path: 'productos', component:ProductosComponent},
    {path: 'cotizacion', component:CotizacionComponent}
];
