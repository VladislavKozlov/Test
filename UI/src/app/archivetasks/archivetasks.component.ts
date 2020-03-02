import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TodoCard } from '../models/todoCard';
import { TodoCardService } from '../todo-card.service';

@Component({
  selector: 'archivetasks-todolist',
  templateUrl: './archivetasks.component.html',
  styleUrls: ['./archivetasks.component.css'],
  providers: [TodoCardService]
})

export class ArchivetasksComponent implements OnInit {

  title = 'Archive';
  cardsAll: Array<TodoCard>;
  cardsArchive: Array<TodoCard>;

  constructor(private todoCardService: TodoCardService) { }

  public renderArchiveCards() {
    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
    });
  }

  ngOnInit(): void {
    this.renderArchiveCards();
  }

}
