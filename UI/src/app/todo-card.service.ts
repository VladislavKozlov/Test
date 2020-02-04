import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodoCardService {

  constructor(private http: HttpClient){ }

  getAllCards() {
    return this.http.get('http://localhost:59863/api/tasks');
  }
}
