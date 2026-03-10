import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  employeeService = inject(EmployeeService);

  users = [];
  maleUsers = [];
  femaleUsers = [];
  totalUsers = 0;
  averageAge = 0;
  ages: any = [];
  genderStats: any;

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data: any) => {
        this.users = data.users;
        this.totalUsers = this.users.length;
        // this.maleUsers = this.users.filter(
        //   (user: any) => user.gender === 'male',
        // );
        // this.femaleUsers = this.users.filter(
        //   (user: any) => user.gender === 'female',
        // );
        this.genderStats = this.users.reduce(
          (acc, user: any) => {
            if (user.gender === 'male') {
              acc.maleCount++;
            } else if (user.gender === 'female') {
              acc.femaleCount++;
            }
            return acc;
          },
          {
            maleCount: 0,
            femaleCount: 0,
          },
        );
        this.ages = this.users.map((user: any) => user.age);
        const totalAge = this.ages.reduce(
          (sum: number, age: number) => sum + age,
          0,
        );
        this.averageAge = totalAge / this.totalUsers;
      },
      error: (err) => {
        console.log('error in getting employees in dashboard component');
        console.log(err);
      },
    });
  }
}
