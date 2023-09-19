import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.http.post('http://localhost:3000/auth/login', formData).subscribe(
        (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('username', this.loginForm.get('username')?.value)
          this.router.navigate(['/home'])
        },
        (error) => {
          this.loginError = true;
          setTimeout(() => {
            this.loginError = false;
          }, 5000)
          console.error('Login failed:', error);
        }
      );
    }
  }
}
