import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../password-match.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, { validators: passwordMatchValidator() });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, firstname, lastname, email, password } = this.registerForm.value;

    // Placeholder for real registration logic
    // this.authService.register({username, firstname, lastname, email, password}).subscribe(...)

    if (username && firstname && lastname && email && password.length >= 6) {
      this.successMessage = 'Registration successful!';
      this.errorMessage = '';
      this.registerForm.reset();
    } else {
      this.errorMessage = 'Registration failed. Please try again.';
      this.successMessage = '';
    }
  }

  get passwordsMismatch() {
    return this.registerForm.errors?.passwordsMismatch && this.registerForm.get('confirm_password')?.touched;
  }
}
