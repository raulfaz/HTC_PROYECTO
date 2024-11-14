import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Solo accedemos a localStorage si estamos en el navegador
      const token = localStorage.getItem('token');
      if (token) {
        return true;
      } else {
        this.router.navigate(['auth']);
        return false;
      }
    }
    // Si no estamos en el navegador, denegamos el acceso
    return false;
  }
}
