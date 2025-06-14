// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  role: string | null;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.role = this.auth.getUserRole();
  }

  ngOnInit() {
    if (this.role === 'Admin') {
      this.http.get<any[]>('http://localhost:3000/api/users').subscribe({
        next: (res) => (this.users = res),
        error: (err) => console.error('Could not fetch users', err),
      });
    }
  }

  updateRole(user: any) {
    const url = `http://localhost:3000/api/users/${user._id}/role`;
    this.http.put(url, { role: user.role }).subscribe({
      next: () => alert(`Role updated to ${user.role}`),
      error: (err) => alert('Failed to update role'),
    });
  }
}
