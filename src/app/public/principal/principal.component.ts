import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { IconoWhatsappComponent } from '../icono-whatsapp/icono-whatsapp.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent,IconoWhatsappComponent, ScrollToTopComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

}
