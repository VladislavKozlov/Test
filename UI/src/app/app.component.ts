import { Component, Inject } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { OnInit } from '@angular/core';
import { TodoCard } from './todoCard';
import { TodoCardService } from './todo-card.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoCardService]
})

export class AppComponent implements OnInit {

  title = 'Todo UI';

  cardsAll: Array<TodoCard>;
  cardsTodo: Array<TodoCard>;
  cardsInProgress: Array<TodoCard>;
  cardsDone: Array<TodoCard>;

  constructor(private todoCardService: TodoCardService) { }

  ngOnInit() {
    this.todoCardService.getAllCards().subscribe((data: Array<TodoCard>) => {
      console.log(data);
      this.cardsAll = data;
      console.log(this.cardsAll);

      this.cardsTodo = this.cardsAll.filter(x => x.status === 0);
      this.cardsInProgress = this.cardsAll.filter(x => x.status === 1);
      this.cardsDone = this.cardsAll.filter(x => x.status === 2);
    },
      error => console.error(error));
  }
}
