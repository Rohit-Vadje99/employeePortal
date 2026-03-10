import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

interface Login {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  http = inject(HttpClient);

  login(loginData: Login) {
    let emailPass = {
      ...loginData,
      expireInMins: 30,
    };
    return this.http.post('https://dummyjson.com/user/login', emailPass).pipe(
      tap({
        next: (data: any) => {
          // this.accessToken = data.accessToken;
          // console.log('login method called in auth service');
          // console.log(this.accessToken);
          // localStorage.setItem('accessToken', data.accessToken);
          // localStorage.removeItem('accessToken');
        },
      }),
    );
  }
}
