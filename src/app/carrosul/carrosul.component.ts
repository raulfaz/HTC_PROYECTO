import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrosul',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './carrosul.component.html',
  styleUrl: './carrosul.component.css'
})
export class CarrosulComponent {

  //imagenUno: string = '../../assets/img-carrosul/uno.jpg';
  // imagenDos: string = '../../assets/img-carrosul/dos.jpg';
  // imagenTres: string ='../../assets/img-carrosul/tres.jpg';

 imagenUno: string = '../../assets/img-carrosul/uno-new.svg';
  imagenDos: string = '../../assets/img-carrosul/dos-new.svg';
  imagenTres: string ='../../assets/img-carrosul/tres-new.svg';
}
