import { Routes } from "@angular/router";
import { PrincipalComponent } from "./principal/principal.component";

export const admin: Routes = [
    {
        path: '',
        component: PrincipalComponent,
        children: [
            {path: '', redirectTo: 'principal', pathMatch: 'full'},
            {path: 'principal', component: PrincipalComponent}
        ]
    }
];
