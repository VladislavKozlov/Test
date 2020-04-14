import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TodoCard } from './models/todoCard';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TodoCardService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  baseApiUrl: string = "http://k2vtodo.somee.com/api/tasks";

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    var applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return of(applicationError);
    }
    var modelStateErrors: string = '';
    var serverError = error.error;
    if (!serverError.type) {
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }
    console.log("modelStateErrors = " + modelStateErrors);
    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    localStorage.setItem('modelStateErrors', modelStateErrors);
    return of(modelStateErrors);
  };

  getAll() {
    return this.http
      .get(this.baseApiUrl)
      .pipe(catchError(this.handleError));
  }

  get(id: number) {
    return this.http
      .get(this.baseApiUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  add(todoCard: TodoCard) {
    return this.http
      .post(this.baseApiUrl,
        JSON.stringify(todoCard),
        this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  remove(id: number) {
    return this.http
      .delete(this.baseApiUrl + '/' + id, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  update(todoCard: TodoCard) {
    return this.http
      .put(this.baseApiUrl + '/' + todoCard.id,
        JSON.stringify(todoCard),
        this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
