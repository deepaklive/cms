import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    // Mock authentication logic
    // Replace with actual auth service call

    this.authService.login(username, password).subscribe(
      (response) => {
        const token = response.token;
        console.log('Login successful');
        this.error = '';
        this.authService.storeToken(username ,token);
        this.router.navigate(['/dashboard']); // Navigate to a protected route
      },
      (error) => {
        this.error = 'Invalid credentials. Please try again.';
      }
    );

    if (username === 'admin' && password === 'admin') {
      // success logic here
      console.log('Login successful');
      this.error = '';
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
