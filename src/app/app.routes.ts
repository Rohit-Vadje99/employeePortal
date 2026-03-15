import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeAddComponent } from './employees/employee-add/employee-add.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { authGuard } from './guards/auth.guard';
import { LogoutComponent } from './auth/logout/logout.component';

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
    canActivate: [authGuard],
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [authGuard],
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
    canActivate: [authGuard],
  },
  {
    path: 'employees/edit/:id',
    component: EmployeeEditComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
];
