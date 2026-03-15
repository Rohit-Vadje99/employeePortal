import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);
  constructor() {}

  getAllEmployees() {
    return this.http.get('https://dummyjson.com/users?limit=0').pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      }),
    );
  }

  getEmployee(id: string) {
    return this.http.get('https://dummyjson.com/users/' + id).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      }),
    );
  }

  addEmployee(employee: any) {
    return this.http.post('https://dummyjson.com/users/add', employee).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      }),
    );
  }

  editEmployee(id: string, employee: any) {
    return this.http.patch('https://dummyjson.com/users/' + id, employee).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      }),
    );
  }

  searchEmployee(name: any) {
    return this.http.get('https://dummyjson.com/users/search?q=' + name).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      }),
    );
  }
}
