import { Component } from '@angular/core';
import { CarrosulComponent } from '../carrosul/carrosul.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CarrosulComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  imagenUno: string = '../../assets/img-carrosul/uno.jpg';
  imagenDos: string = '../../assets/img-carrosul/dos.jpg';
  imagenTres: string ='../../assets/img-carrosul/tres.jpg';
}
