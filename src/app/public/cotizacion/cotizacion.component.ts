import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormCotizacionComponent } from '../form-cotizacion/form-cotizacion.component';

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [CommonModule, FormsModule, FormCotizacionComponent],
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css'
})
export class CotizacionComponent {

}
