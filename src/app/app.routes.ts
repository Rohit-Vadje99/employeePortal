import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeAddComponent } from './employees/employee-add/employee-add.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    // children: [
    //   {
    //     path: ':id',
    //     component: EmployeeDetailsComponent,
    //   },
    // ],
  },
  {
    path: 'employees/add',
    component: EmployeeAddComponent,
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
  },
  {
    path: 'employees/edit/:id',
    component: EmployeeEditComponent,
  },
];
