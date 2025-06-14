// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };

  errors = {
    email: '',
    password: '',
    general: '',
  };

  isSubmitting = false;
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  validateForm(): boolean {
    this.clearErrors();
    let isValid = true;

    // Email validation
    if (!this.user.email.trim()) {
      this.errors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.user.email)) {
      this.errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!this.user.password) {
      this.errors.password = 'Password is required';
      isValid = false;
    } else if (this.user.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    return isValid;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  clearErrors(): void {
    this.errors = {
      email: '',
      password: '',
      general: '',
    };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    this.errors.general = '';

    // Trim and normalize email
    const userData = {
      ...this.user,
      email: this.user.email.trim().toLowerCase(),
    };

    this.auth.login(userData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.auth.setToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isSubmitting = false;

        // Handle different types of login errors
        if (err.status === 401) {
          this.errors.general = 'Invalid email or password. Please try again.';
        } else if (err.status === 404) {
          this.errors.general =
            'User not found. Please check your email or register.';
        } else {
          this.errors.general =
            err.error?.message || 'Login failed. Please try again.';
        }
      },
    });
  }

  // Real-time validation methods
  onEmailBlur(): void {
    if (this.user.email.trim() && !this.isValidEmail(this.user.email)) {
      this.errors.email = 'Please enter a valid email address';
    } else {
      this.errors.email = '';
    }
  }

  onPasswordBlur(): void {
    if (this.user.password && this.user.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters long';
    } else {
      this.errors.password = '';
    }
  }
}
