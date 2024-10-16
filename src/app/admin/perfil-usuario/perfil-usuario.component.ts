import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit {
  username = '';
  password = '';
  confirmPassword = '';

  ngOnInit() {
    // Aquí irían las llamadas a los servicios para obtener los datos del usuario
    this.username = 'admin';
  }

  onSubmit() {
    // Aquí iría la lógica para actualizar el perfil
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Actualizando perfil...');
    // Lógica para enviar los datos actualizados al servidor
  }
}