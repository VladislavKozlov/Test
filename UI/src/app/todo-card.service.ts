import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TodoCard } from './models/todoCard';
import { catchError } from 'rxjs/operators';
import { _throw } from "rxjs/observable/throw";
import { Observable } from 'rxjs';
import { Json } from './models/Json';
import { JsonError } from './models/json-error';
import { ErrorService } from './error.service';

@Injectable()
export class TodoCardService {

  baseApiUrl: string = "http://localhost:59863/api/tasks";
  ErrorService: any;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return _throw('Something bad happened; please try again later.');
  };

  getAll() {
    return this.http.get(this.baseApiUrl).pipe(catchError(this.handleError));
  }

  get(id: number) {
    return this.http.get(this.baseApiUrl + '/' + id);
  }

  //add(todoCard: TodoCard): Observable<Json | JsonError> {
    //const body = { taskName: todoCard.taskName, description: todoCard.description };
    //return this.http.post<Json | JsonError>(this.baseApiUrl, body).pipe(catchError(this.ErrorService.handleError));
  //}

  add(todoCard: TodoCard) {
    const body = { taskName: todoCard.taskName, description: todoCard.description };
    return this.http.post(this.baseApiUrl, body).pipe(catchError(this.handleError));
  }

  remove(id: number) {
    return this.http.delete(this.baseApiUrl + '/' + id);
  }

  update(todoCard: TodoCard) {
    const body = { taskName: todoCard.taskName, description: todoCard.description, status: todoCard.status };
    return this.http.put(this.baseApiUrl, body);
  }
}
