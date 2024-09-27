import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-cotizacion',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './form-cotizacion.component.html',
  styleUrl: './form-cotizacion.component.css'
})
export class FormCotizacionComponent {
  
}
