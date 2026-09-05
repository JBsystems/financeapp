import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  template: `<div class="auth-container">
  <div class="auth-card">
    <div class="back-home">
      <a routerLink="/" class="home-link">← Back to Home</a>
    </div>
    <div class="auth-header">
      <h1>Create Your Account</h1>
      <p>Let's Start Managing Your Money</p>
    </div>

    <form class="auth-form" [formGroup]="signupForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" formControlName="firstName" placeholder="First Name">
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" formControlName="lastName" placeholder="Last Name">
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" formControlName="username" placeholder="Enter a username">
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email" placeholder="Enter your email">
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="text" id="phone" formControlName="phone" placeholder="Phone Number">
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" formControlName="password" placeholder="Enter a Password">
      </div>

      @if (errorMessage) {
      <div class="error-message" style="color: red; margin-bottom: 10px;">
        {{ errorMessage }}
      </div>
      }

      <button type="submit" class="btn-primary" [disabled]="!signupForm.valid">Create Account</button>

      <div class="auth-footer">
        <p>Already have an account? <a routerLink="/login">Sign in</a></p>
      </div>
    </form>
  </div>
</div>`,
  styles: [`.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #050505;
  background-image:
    radial-gradient(at 0% 0%, hsla(347, 78%, 44%, 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 0%, hsla(347, 78%, 44%, 0.1) 0px, transparent 50%);
  position: relative;
  overflow: hidden;
}

.auth-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(206, 17, 65, 0.03) 0%, transparent 50%);
  animation: rotate 20s linear infinite;
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.auth-card {
  background: rgba(18, 18, 18, 0.6);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  padding: 3rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.auth-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.6);
  border-color: rgba(206, 17, 65, 0.2);
}

.back-home {
  margin-bottom: 2.5rem;
}

.home-link {
  color: var(--text-gray);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;
}

.home-link:hover {
  color: var(--text-white);
}

.auth-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.auth-header h1 {
  color: var(--text-white);
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  background: linear-gradient(180deg, #FFFFFF 0%, #a0a0a0 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.auth-header p {
  color: var(--text-gray);
  font-size: 1rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-white);
  font-size: 0.875rem;
  font-weight: 500;
  margin-left: 0.25rem;
}

.form-group input {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  color: white;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-group input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--bulls-red);
  box-shadow: 0 0 0 4px rgba(206, 17, 65, 0.1);
  transform: scale(1.01);
}

.form-group input::placeholder {
  color: #555;
}

.btn-primary {
  background: var(--bulls-red);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: 1rem;
  font-family: 'Outfit', sans-serif;
  letter-spacing: 0.02em;
}

/* Motion for the button */
.btn-primary::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
  transition: 0.5s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(206, 17, 65, 0.4);
}

.btn-primary:hover::after {
  left: 100%;
}

.btn-primary:active {
  transform: translateY(0);
}

.error-message {
  background: rgba(206, 17, 65, 0.1);
  border: 1px solid rgba(206, 17, 65, 0.2);
  color: #ff4d6d !important;
  font-size: 0.875rem;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.auth-footer p {
  color: var(--text-gray);
  font-size: 0.875rem;
}

.auth-footer a {
  color: var(--text-white);
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.25rem;
  transition: color 0.2s;
}

.auth-footer a:hover {
  color: var(--bulls-red);
  text-decoration: underline;
}`]
})

export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('User Registered!', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
    }
  }
}
