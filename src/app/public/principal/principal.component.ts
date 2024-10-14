import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { IconoWhatsappComponent } from '../icono-whatsapp/icono-whatsapp.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent,IconoWhatsappComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

}
