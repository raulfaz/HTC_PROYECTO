import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroService } from '../services/registro.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-cotizacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [FormBuilder, RegistroService],
  templateUrl: './form-cotizacion.component.html',
  styleUrl: './form-cotizacion.component.css'
})
export class FormCotizacionComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private registroService: RegistroService) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚÑáéíóúñ\\s]{3,50}$')]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      mensaje: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = { ...this.form.value };
      console.log('Datos del formulario:', formData);

      this.registroService.createFormulario(formData).subscribe(
        (response) => {
          Swal.fire('Formulario enviado', 'Su mensaje ha sido enviado con éxito', 'success');
          this.form.reset();
        },
        (error) => {
          Swal.fire('Error', 'No se pudo enviar el formulario', 'error');
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
