import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { UserRegistration } from './models/user.registration.interface';
import { BaseService } from "./base.service";
import '../rxjs-operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserService extends BaseService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  baseUrl: string = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: HttpClient) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = "http://localhost:59863/api/account";
  }

  register(email: string, password: string, confirmPassword: string): Observable<UserRegistration> {
    return this.http.post(this.baseUrl + "/register",
      JSON.stringify({ email, password, confirmPassword }), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post(
        this.baseUrl + '/login',
        JSON.stringify({ email, password }), this.httpOptions
      )
      .map((res: { auth_token: string; }) => {
        localStorage.setItem('auth_token', res.auth_token);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

}

