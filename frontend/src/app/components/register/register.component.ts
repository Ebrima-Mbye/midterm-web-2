// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user = {
    fullName: '',
    email: '',
    password: '',
    role: 'Viewer', // default role
  };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => alert(err.error.message || 'Registration failed'),
    });
  }
}
