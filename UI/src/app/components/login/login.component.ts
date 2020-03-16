import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TodoCard } from './../../models/todoCard';
import { TodoCardService } from './../../todo-card.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [TodoCardService]
})

export class LoginComponent implements OnInit {

  title = 'Todo UI';

  constructor(private todoCardService: TodoCardService) { }

  ngOnInit(): void { 
  }
}
