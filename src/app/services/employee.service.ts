import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);
  constructor() {}

  getAllEmployees() {
    return this.http.get('https://dummyjson.com/users?limit=0');
  }

  getEmployee(id: string) {
    return this.http.get('https://dummyjson.com/users/' + id);
  }

  addEmployee(employee: any) {
    return this.http.post('https://dummyjson.com/users/add', employee);
  }

  editEmployee(id: string, employee: any) {
    return this.http.patch('https://dummyjson.com/users/' + id, employee);
  }

  searchEmployee(name: any) {
    return this.http.get('https://dummyjson.com/users/search?q=' + name);
  }
}
