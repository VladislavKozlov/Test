import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseService } from "./base.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';


@NgModule({
  exports: [RouterModule]
})
@Injectable()
export class UserService extends BaseService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  baseUrl: string = '';
  userName: string = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: HttpClient) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = "http://k2vtodo.somee.com/api/account";
  }

  getUserName() {
    var userId = localStorage.getItem('user_id');
    if (userId != undefined) {
      return this.http
        .get(this.baseUrl + '/get/' + userId)
        .pipe(catchError(this.handleError));
    }
  }

  register(email: string, password: string) {
    return this.http.post(this.baseUrl + "/register",
      JSON.stringify({ email, password }), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post(
        this.baseUrl + '/login',
        JSON.stringify({ email, password }), this.httpOptions
      ).pipe(map((res: { auth_token: string; id: string }) => {
        localStorage.setItem('auth_token', res.auth_token);
        localStorage.setItem('user_id', res.id);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      }), catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}

