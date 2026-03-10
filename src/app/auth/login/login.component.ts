import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('form submitted');
      console.log(this.loginForm);
      console.log(this.loginForm.value);
      const loginData = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
      };
      this.authService.login(loginData).subscribe({
        next: (data) => {
          console.log('login successful');
          console.log(data);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log('login failed in error block of login component');
          console.log(err);
        },
        complete: () => {},
      });
    } else {
      throw new Error('Form is not valid');
    }
  }
}
