import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css',
})
export class EmployeeEditComponent implements OnInit {
  employeeService = inject(EmployeeService);
  activatedRoute = inject(ActivatedRoute);
  id = '';
  user: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (parammap) => {
        this.id = parammap.get('id') || '';
      },
    });
  }

  editForm = new FormGroup({
    firstName: new FormControl('', { validators: [] }),
    lastName: new FormControl('', { validators: [] }),
    age: new FormControl('', {
      validators: [Validators.max(99)],
    }),
  });

  onSubmit() {
    if (this.editForm.valid) {
      const values = Object.fromEntries(
        Object.entries(this.editForm.value).filter(([key, value]) => value),
      );

      console.log('valid edit form');
      this.employeeService.editEmployee(this.id, values).subscribe({
        next: (data) => {
          console.log('edit successful');
          console.log(data);
          this.user = data;
        },
        error: (err) => {
          console.log('error in edit service');
          console.log(err);
        },
      });
    } else {
      throw new Error('from is invalid');
    }
  }
}
