import { AfterViewInit, Component } from '@angular/core';
import { CarrosulComponent } from '../carrosul/carrosul.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SERVICIOS } from '../datos/servicios';
import { CommonModule } from '@angular/common';
import { FormCotizacionComponent } from '../form-cotizacion/form-cotizacion.component';
import { MatCardModule } from '@angular/material/card';


// Declaramos AOS como una variable global
declare var AOS: any;

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CarrosulComponent,CommonModule,FormCotizacionComponent,MatCardModule, RouterLink, RouterOutlet],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  
 



  imagenUno: string = '../../assets/img-carrosul/uno.jpg';
  imagenDos: string = '../../assets/img-carrosul/dos.jpg';
  imagenTres: string ='../../assets/img-carrosul/tres.jpg';

  activeIndex = 0;

  nextService() {
    this.activeIndex = (this.activeIndex + 1) % this.servicios.length;
  }

  prevService() {
    this.activeIndex = (this.activeIndex - 1 + this.servicios.length) % this.servicios.length;
  }

  servicios = SERVICIOS
}
