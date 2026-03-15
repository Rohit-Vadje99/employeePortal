import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent implements OnInit {
  employeeService = inject(EmployeeService);
  activatedRoute = inject(ActivatedRoute);
  id: string | null = '';
  employee: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (parammap) => {
        this.id = parammap.get('id');
      },
    });

    if (this.id) {
      this.employeeService.getEmployee(this.id).subscribe({
        next: (data) => {
          this.employee = data;
        },
        error: (err) => {
          console.log('error for employee', this.id);
          console.log(err);
        },
      });
    }
  }
}
