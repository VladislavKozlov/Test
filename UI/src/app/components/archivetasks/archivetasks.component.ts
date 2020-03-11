import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TodoCard } from './../../models/todoCard';
import { TodoCardService } from './../../todo-card.service';

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
  sortingTaskNameActive = false;
  sortingDescriptionActive = false;
  sortingDateActive = false;

  constructor(private todoCardService: TodoCardService) { }

  public renderArchiveCards() {
    this.isSortingTaskName();
    this.isSortingDescription();
    this.isSortingDate();

    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
    });
  }

  ngOnInit(): void {
    this.renderArchiveCards();
  }

  public sortTitle() {
    this.sortingDescriptionActive = false;
    this.sortingDateActive = false;
    this.isSortingTaskName();
    this.isSortingDescription();
    this.isSortingDate();

    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      if (!this.sortingTaskName) {
        this.sortingTaskNameActive = true;
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
        this.cardsArchive = this.cardsArchive.sort(function (a, b) {
          var textA = a.taskName.toUpperCase();
          var textB = b.taskName.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      } else {
        this.sortingTaskNameActive = true;
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
      }
      this.sortingTaskName = !this.sortingTaskName;
    });
  }

  public sortDescription() {
    this.sortingDateActive = false;
    this.sortingTaskNameActive = false;
    this.isSortingTaskName();
    this.isSortingDescription();
    this.isSortingDate();

    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      if (!this.sortingDescription) {
        this.sortingDescriptionActive = true;
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
        this.cardsArchive = this.cardsArchive.sort(function (a, b) {
          var textA = a.description.toUpperCase();
          var textB = b.description.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      } else {
        this.sortingDescriptionActive = true;
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
      }
      this.sortingDescription = !this.sortingDescription;
    });
  }

  public sortDate() {
    this.sortingTaskNameActive = false;
    this.sortingDescriptionActive = false;
    this.isSortingTaskName();
    this.isSortingDescription();
    this.isSortingDate();

    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      if (!this.sortingDate) {
        this.sortingDateActive = true;
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
        this.cardsArchive = this.cardsArchive.sort((a: TodoCard, b: TodoCard) => b.id - a.id);
      } else {
        this.sortingDateActive = true;
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
      }
      this.sortingDate = !this.sortingDate;
    });
  }

  public isSortingTaskName() {
    if (this.sortingTaskNameActive) {
      return false;
    } else {
      return true;
    }
  }

  public isSortingAscTaskName() {
    if (this.sortingTaskName && this.sortingTaskNameActive) {
      return true;
    } else {
      return false;
    }
  }

  public isSortingDescTaskName() {
    if (!this.sortingTaskName && this.sortingTaskNameActive) {
      return true;
    } else {
      return false;
    }
  }

  public isSortingDescription() {
    if (this.sortingDescriptionActive) {
      return false;
    } else {
      return true;
    }
  }

  public isSortingAscDescription() {
    if (!this.sortingDescription && this.sortingDescriptionActive) {
      return true;
    } else {
      return false;
    }
  }

  public isSortingDescDescription() {
    if (this.sortingDescription && this.sortingDescriptionActive) {
      return true;
    } else {
      return false;
    }
  }

  public isSortingDate() {
    if (this.sortingDateActive) {
      return false;
    } else {
      return true;
    }
  }

  public isSortingAscDate() {
    if (!this.sortingDate && this.sortingDateActive) {
      return true;
    } else {
      return false;
    }
  }

  public isSortingDescDate() {
    if (this.sortingDate && this.sortingDateActive) {
      return true;
    } else {
      return false;
    }
  }

}
