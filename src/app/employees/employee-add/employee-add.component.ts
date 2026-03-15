import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css',
})
export class EmployeeAddComponent {
  employeeService = inject(EmployeeService);
  router = inject(Router);

  newEmployee = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    age: new FormControl('', { validators: [Validators.max(99)] }),
  });

  onSubmit() {
    if (this.newEmployee.valid) {
      console.log('add employee form is correct');

      console.log('Employee added:', this.newEmployee.value);
      this.employeeService.addEmployee(this.newEmployee.value).subscribe({
        next: (data) => {
          console.log('added employee successfully');
          console.log(data);
          this.router.navigate(['employees']);
        },
        error: (err) => {
          console.log('error to add employee');
          console.log(err);
        },
      });
    } else {
      throw new Error('Form is not valid');
    }
  }
}
