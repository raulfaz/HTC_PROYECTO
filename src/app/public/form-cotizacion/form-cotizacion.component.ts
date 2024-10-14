import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-cotizacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-cotizacion.component.html',
  styleUrl: './form-cotizacion.component.css'
})
export class FormCotizacionComponent {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  mensaje: string = '';

  onSubmit() {
    if (this.nombre && this.email && this.telefono && this.mensaje) {
      // Acción al enviar el formulario
      console.log('Formulario enviado:', this.nombre, this.email, this.telefono, this.mensaje);
    }
  }
}
