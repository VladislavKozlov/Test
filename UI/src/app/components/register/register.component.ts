import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TodoCard } from './../../models/todoCard';
import { TodoCardService } from './../../todo-card.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [TodoCardService]
})

export class RegisterComponent implements OnInit {

  title = 'Todo UI';

  constructor(private todoCardService: TodoCardService) { }

  ngOnInit(): void {
   
  }

}
