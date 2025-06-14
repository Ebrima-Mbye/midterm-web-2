import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    fullName: '',
    email: '',
    password: '',
    role: 'Viewer',
  };

  errors = {
    fullName: '',
    email: '',
    password: '',
    general: '',
  };

  showPassword = false;
  isSubmitting = false;

  constructor(private auth: AuthService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  validateForm(): boolean {
    this.clearErrors();
    let isValid = true;

    const fullName = this.user.fullName.trim();
    const email = this.user.email.trim();
    const password = this.user.password;

    // Full Name
    if (!fullName) {
      this.errors.fullName = 'Full name is required';
      isValid = false;
    } else if (fullName.length < 2) {
      this.errors.fullName = 'Full name must be at least 2 characters';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      this.errors.fullName = 'Full name can only contain letters and spaces';
      isValid = false;
    }

    // Email
    if (!email) {
      this.errors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(email)) {
      this.errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password
    if (!password) {
      this.errors.password = 'Password is required';
      isValid = false;
    } else if (!this.isPasswordStrong(password)) {
      this.errors.password =
        'Password must contain at least 6 characters, including an uppercase letter, a lowercase letter, and a number';
      isValid = false;
    }

    return isValid;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isPasswordStrong(password: string): boolean {
    return (
      password.length >= 6 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password)
    );
  }

  onBlur(field: string): void {
    const value = this.user[field as keyof typeof this.user].toString().trim();

    switch (field) {
      case 'fullName':
        if (!value) {
          this.errors.fullName = 'Full name is required';
        } else if (value.length < 2) {
          this.errors.fullName = 'Full name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          this.errors.fullName =
            'Full name can only contain letters and spaces';
        } else {
          this.errors.fullName = '';
        }
        break;

      case 'email':
        this.errors.email =
          value && !this.isValidEmail(value)
            ? 'Please enter a valid email address'
            : '';
        break;

      case 'password':
        this.errors.password =
          value && !this.isPasswordStrong(value)
            ? 'Password must contain at least 6 characters, including an uppercase letter, a lowercase letter, and a number'
            : '';
        break;
    }
  }

  clearErrors(): void {
    this.errors = {
      fullName: '',
      email: '',
      password: '',
      general: '',
    };
  }

  register(): void {
    if (!this.validateForm()) return;

    this.isSubmitting = true;
    this.errors.general = '';

    const userData = {
      ...this.user,
      fullName: this.user.fullName.trim(),
      email: this.user.email.trim().toLowerCase(),
    };

    this.auth.register(userData).subscribe({
      next: () => {
        this.isSubmitting = false;
        alert('Registration successful! Please login to continue.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errors.general =
          err.error?.message || 'Registration failed. Please try again.';

        const backendErrors = err.error?.errors;
        if (backendErrors) {
          this.errors.fullName = backendErrors.fullName || '';
          this.errors.email = backendErrors.email || '';
          this.errors.password = backendErrors.password || '';
        }
      },
    });
  }

  hasLowercase(): boolean {
    return /[a-z]/.test(this.user.password);
  }
  hasUppercase(): boolean {
    return /[A-Z]/.test(this.user.password);
  }
  hasDigit(): boolean {
    return /\d/.test(this.user.password);
  }
  hasMinLength(): boolean {
    return this.user.password.length >= 6;
  }
}
