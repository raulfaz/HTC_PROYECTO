import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink,Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, MatIconModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token);
        localStorage.setItem('username', response.username);
        this.router.navigate(['admin']);
      },
      error: (error: any) => {
        this.errorMessage = 'Credenciales incorrectas';
        console.error('Error en el login', error);
      }
    });
  }
}
