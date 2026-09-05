import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: `<div class="auth-container">
  <div class="auth-card">
  <div class="back-home">
  <a routerLink="/" class="home-link">← Back to Home</a>
</div>
<div class="auth-header">
  <h1>Welcome Back</h1>
<p>Sign into your account</p>
</div>

<form class="auth-form" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
<div class="form-group">
  <label for="username">Username</label>
  <input type="text" id="username" formControlName="username" placeholder="Enter your username">
  </div>

  <div class="form-group">
  <label for="password">Password</label>
  <input type="password" id="password" formControlName="password" placeholder="Enter your password">
  </div>

@if (errorMessage) {
  <div class="error-message" style="color: red; margin-bottom: 10px;">
    {{ errorMessage }}
  </div>
}

<button type="submit" class="btn-primary" [disabled]="!loginForm.valid">Sign In</button>

<div class="auth-footer">
  <p>Don't have an account? <a routerLink="/signup">Sign up</a></p>
</div>
</form>
</div>
</div>`,
  styleUrl: './login.css'
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('User Logged In!', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid username or password.';
        }
      });
    }
  }
}
