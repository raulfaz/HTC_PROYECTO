import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent  {
  username: string = '';           // Nuevo nombre de usuario
  newPassword: string = '';         // Nueva contraseña
  currentPassword: string = '';     // Contraseña actual para confirmar
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (!this.username && !this.newPassword) {
      this.message = 'Por favor, ingresa al menos un cambio (usuario o contraseña)';
      return;
    }

    this.authService.updateProfile(this.currentPassword, this.newPassword, this.username).subscribe(
      (response) => {
        this.message = response.message;  // Mensaje de éxito desde el backend
      },
      (error) => {
        this.message = 'Error al actualizar perfil';
      }
    );
  }
}