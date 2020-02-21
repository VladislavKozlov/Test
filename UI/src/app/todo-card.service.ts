import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoCard } from './models/todoCard';

@Injectable()
export class TodoCardService {

  baseApiUrl: string = "http://localhost:59863/api/tasks";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.baseApiUrl);
  }

  get(id: number) {
    return this.http.get(this.baseApiUrl + '/' + id);
  }

  add(todoCard: TodoCard) {
    const body = { taskName: todoCard.taskName, description: todoCard.description };
    return this.http.post(this.baseApiUrl, body);
  }

  remove(id: number) {
    return this.http.delete(this.baseApiUrl + '/' + id);
  }

  update(todoCard: TodoCard) {
    const body = { taskName: todoCard.taskName, description: todoCard.description, status: todoCard.status };
    return this.http.put(this.baseApiUrl, body);
  }
}
