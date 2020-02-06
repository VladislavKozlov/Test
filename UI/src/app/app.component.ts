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

  //cardsAll: Array<TodoCard>;
  cardsTodo: Array<TodoCard>;
  cardsInProgress: Array<TodoCard>;
  cardsDone: Array<TodoCard>;
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
  //status: number;


  constructor(private todoCardService: TodoCardService) { }

  ngOnInit() {
    this.todoCardService.getAllCards().subscribe((data: Array<TodoCard>) => {
      console.log(data);

      this.todoCount = 0;
      this.inProgressCount = 0;
      this.doneCount = 0;
      //this.cardsAll = new Array<TodoCard>();
      this.cardsTodo = new Array<TodoCard>();
      this.cardsInProgress = new Array<TodoCard>();
      this.cardsDone = new Array<TodoCard>();

      for (var i in data.todoCards) {
        //if (data.todoCards[i].status == 0) {
          //this.cardsAll[i] = data.todoCards[i];
          //console.log(this.cardsAll[i]);
        //}
        if (data.todoCards[i].status == 0) {
          this.cardsTodo[this.todoCount] = data.todoCards[i];
          this.todoCount++;
          console.log(this.cardsTodo[i]);
        }
        if (data.todoCards[i].status == 1) {
          this.cardsInProgress[this.inProgressCount] = data.todoCards[i];
          this.inProgressCount++;
        }
        if (data.todoCards[i].status == 2) {
          this.cardsDone[this.doneCount] = data.todoCards[i];
          this.doneCount++;
        }
      }
    },
      error => console.error(error));
  }

  //public constructor(private dragulaService: DragulaService) {
  //dragulaService.createGroup("Spill", {
  //removeOnSpill: true
  //});

}
