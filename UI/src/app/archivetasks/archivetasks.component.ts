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

  title = 'Todo UI';
  cardsAll: Array<TodoCard>;
  cardsArchive: Array<TodoCard>;
  cardsArchiveSort: Array<TodoCard>;
  sortingTaskName = false;
  sortingDescription = false;
  sortingDate = false;
  //dateNew = new Date();

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

  public sortTitle() {
    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      if (!this.sortingTaskName) {
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
        //this.cardsArchive = this.cardsArchive.sort((a: TodoCard, b: TodoCard) => b.taskName - a.taskName);//???
        this.cardsArchive = this.cardsArchive.sort((a: TodoCard, b: TodoCard) => b.id - a.id);
      } else {
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
      }
      this.sortingTaskName = !this.sortingTaskName;
    });
  }

  public sortDescription() {
    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      if (!this.sortingDescription) {
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
        this.cardsArchive = this.cardsArchive.sort((a: TodoCard, b: TodoCard) => b.id - a.id);
      } else {
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
      }
      this.sortingDescription = !this.sortingDescription;
    });
  }

  public sortDate() {
    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      if (!this.sortingDate) {
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
        //this.cardsArchive = this.cardsArchive.sort((a: any, b: any) => new Date(b.createDate) - new Date(a.createDate));//???
        this.cardsArchive = this.cardsArchive.sort((a: TodoCard, b: TodoCard) => b.id - a.id);
      } else {
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
      }
      this.sortingDate = !this.sortingDate;
    });
  }

  public compareFunction(a: any, b: any) {
    return a - b;
  }

}
