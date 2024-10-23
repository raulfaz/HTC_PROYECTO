import { Routes } from "@angular/router";
import { PrincipalComponent } from "./principal/principal.component";
import { ProductosComponent } from "./productos/productos.component";
import { CatalogosComponent } from "./catalogos/catalogos.component";
import { PerfilUsuarioComponent } from "./perfil-usuario/perfil-usuario.component";
import { CotizacionComponent } from "./cotizacion/cotizacion.component";

export const admin: Routes = [
    {
        path: '',
        component: PrincipalComponent,
        children: [
            {path: '', redirectTo: 'productos', pathMatch: 'full'},
           // {path: 'principal', component: PrincipalComponent},
            {path: 'productos', component: ProductosComponent},
            {path: 'catalogos', component: CatalogosComponent},
            {path: 'perfil-usuario', component: PerfilUsuarioComponent},
            {path: 'cotizacion', component: CotizacionComponent}
        ]
    }
];
