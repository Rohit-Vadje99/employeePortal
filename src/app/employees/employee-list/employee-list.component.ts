import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  users: any[] = [];

  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data: any) => {
        this.users = data.users;
      },
      error: (err) => {},
    });
  }
}
