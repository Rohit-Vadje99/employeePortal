import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  users: any[] = [];

  searchValue = new FormControl('');

  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data: any) => {
        this.users = data.users;
      },
      error: (err) => {},
    });

    this.searchValue.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) => this.employeeService.searchEmployee(value)),
      )
      .subscribe({
        next: (data: any) => {
          console.log('searched employee successfully');
          // console.log(data);
          this.users = data.users;
        },
        error: (err) => {
          console.log('error searching employee with name');
          throw err;
        },
      });
  }
}
