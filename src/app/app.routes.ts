import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./public/public.routes').then(m => m.publico), // Rutas públicas
    },
    {
        path: 'public',
        loadChildren: () => import('./public/public.routes').then(m => m.publico)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.admin)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.auth)
    }

];
