import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface Login {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _accessToken = new BehaviorSubject('');
  accessToken$ = this._accessToken.asObservable();
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
          this._accessToken.next(data.accessToken);
          console.log('login method called in auth service');
          // console.log(this.accessToken);
          // localStorage.setItem('accessToken', data.accessToken);
          // localStorage.removeItem('accessToken');
        },
      }),
    );
  }

  logout() {
    this._accessToken.next('');
  }
}
