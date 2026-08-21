import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PrincipalComponent } from "../admin/principal/principal.component";
import { AuthGuard } from "../guards/auth.guard";

export const auth: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard]}

];
