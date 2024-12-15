import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../password-match.validator';
import { ApiService } from 'src/app/shared/api.services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
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

    const { username, first_name, lastname, email, password } = this.registerForm.value;

    this.apiService.post('register/', this.registerForm.value).subscribe(
      (res: any) => {
        this.successMessage = 'Registration successful!';
      this.errorMessage = '';
      this.registerForm.reset();
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      (err) => {
                  this.errorMessage = 'Registration failed. Please try again.' + JSON.stringify(err.error);
          this.successMessage = '';
      }
    );
  }

 

  get passwordsMismatch() {
    return this.registerForm.errors?.passwordsMismatch && this.registerForm.get('confirm_password')?.touched;
  }
}
