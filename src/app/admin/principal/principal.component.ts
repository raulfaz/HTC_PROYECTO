import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MatToolbar,MatSidenavModule,MatIcon,MatMenuModule,MatListModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  isSidenavOpen = true;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  constructor(private router: Router) {}

  logout() {
    // Logic to close the session (e.g., clearing tokens, user data, etc.)
    // For example, localStorage.clear();
    localStorage.clear();

    // Navigate to the home page
    this.router.navigate(['/']);
  }

}
