import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import 'rxjs';

@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient) {

  }

getSomePage() {
  return this.httpClient.get<Todo>('https://jsonplaceholder.typicode.com/todos/1');
}

}
