// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  role: string | null;
  adminCount = 0;
  errorMessage = '';

  constructor(private auth: AuthService, private http: HttpClient) {
    this.role = this.auth.getUserRole();
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    if (this.role !== 'Admin') return;
    this.http.get<any[]>('http://localhost:3000/api/users').subscribe({
      next: (res) => {
        this.users = res;
        this.adminCount = this.users.filter((u) => u.role === 'Admin').length;
      },
      error: (err) => {
        console.error('Could not fetch users', err);
        this.errorMessage = 'Failed to load users';
      },
    });
  }

  isLastAdmin(user: any): boolean {
    // if this user is an Admin and they're the only one
    return user.role === 'Admin' && this.adminCount <= 1;
  }

  updateRole(user: any) {
    this.errorMessage = '';
    const url = `http://localhost:3000/api/users/${user._id}/role`;
    this.http.put(url, { role: user.role }).subscribe({
      next: () => {
        // reload to get fresh counts
        this.loadUsers();
      },
      error: (err) => {
        if (
          err.status === 400 &&
          err.error.message.includes('At least one admin')
        ) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Failed to update role';
        }
        // revert UI change by reloading
        this.loadUsers();
      },
    });
  }

  confirmDelete(user: any) {
    const confirmed = confirm(
      `Are you sure you want to delete "${user.fullName}" (${user.email})? This cannot be undone.`
    );

    if (!confirmed) return;

    // Prevent deleting the last Admin
    if (user.role === 'Admin' && this.adminCount <= 1) {
      this.errorMessage = 'You cannot delete the only Admin in the system.';
      return;
    }

    const url = `http://localhost:3000/api/users/${user._id}`;
    this.http.delete(url).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Failed to delete user. Please try again.';
      },
    });
  }
}
