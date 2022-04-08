import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from './UserInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authError: Subject<string> = new Subject();
  authSuccess: Subject<void> = new Subject();
  authLogout: Subject<void> = new Subject();

  constructor(private http: HttpClient, private router: Router) { }

  logout() {
    localStorage.removeItem('jwt');

    this.router.navigate(['/login']);

    this.authLogout.next();
  }

  getUserInfo(): Observable<HttpResponse<UserInfo>> {
    return this.http.get<UserInfo>(`${environment.URL}/test`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      observe: 'response'
    });
  }

  login(username: string, password: string) {
    this.http.post(`${environment.URL}/login`, {
      'username': username,
      'password': password
    }, { 
      "observe": 'response'
    })
    .subscribe((res) => {
      if (res.status === 200) {
        if (res.headers.get('token')) {
          localStorage.setItem('jwt', res.headers.get('token')!);

          this.router.navigate(['/portal'])
        }
      }
      
      this.authSuccess.next();
    }, (err) => {
      this.authError.next(err.error);
    });;

  }

}
