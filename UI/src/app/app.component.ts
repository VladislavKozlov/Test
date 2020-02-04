import { Component, Inject } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { OnInit} from '@angular/core';
import {TodoCard} from './todoCard';
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
  
  cardsTodo: Array<TodoCard>;  
  cardsInProgress: Array<TodoCard>;
  cardsDone: Array<TodoCard>;  
  
  constructor(private todoCardService: TodoCardService){}
      
  ngOnInit(){     
      this.todoCardService.getAllCards().subscribe((data: Array<TodoCard>) => {
        console.log(data);
        
        this.cardsTodo = new Array<TodoCard>();
        for (var index in data.cardsTodo) {
          this.cardsTodo[index] = data.cardsTodo[index];         
        }

        this.cardsInProgress = new Array<TodoCard>();
        for (var index in data.cardsInProgress) {
          this.cardsInProgress[index] = data.cardsInProgress[index];         
        }

        this.cardsDone = new Array<TodoCard>();
        for (var index in data.cardsDone) {
          this.cardsDone[index] = data.cardsDone[index];         
        }
      }, 
        error => console.error(error));
  }
    
  //public constructor(private dragulaService: DragulaService) {
    //dragulaService.createGroup("Spill", {
      //removeOnSpill: true
    //});

}
