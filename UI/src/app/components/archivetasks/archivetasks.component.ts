import { Component, HostListener } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoCard } from './../../models/todoCard';
import { UserService } from './../../user.service';
import { TodoCardService } from './../../todo-card.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'archivetasks-todolist',
  templateUrl: './archivetasks.component.html',
  styleUrls: ['./archivetasks.component.css'],
  providers: [TodoCardService]
})

export class ArchivetasksComponent implements OnInit {

  title = 'Todo UI';
  navStatus: boolean = false;
  subscription: Subscription;
  cardsAll: Array<TodoCard>;
  cardsArchive: Array<TodoCard>;
  cardsArchiveSort: Array<TodoCard>;
  isSortingTaskName = true;
  isSortingDescription = true;
  isSortingDate = true;
  isAscTaskName = false;
  isAscDescription = false;
  isAscDate = false;
  searchValue: string = '';
  userName = '';

  constructor(private todoCardService: TodoCardService, private userService: UserService, private router: Router) { }

  public renderArchiveCards() {
    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      this.cardsArchive = this.cardsAll.filter(x => x.status === 3 && x.userName === this.userName);
    });
  }

  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.searchValue = localStorage.getItem('search_value');
  }

  ngOnInit(): void {
    this.subscription = this.userService.authNavStatus$.subscribe(navStatus => this.navStatus = navStatus);
    localStorage.setItem('search_value', '');
    if (this.navStatus) {
      this.userName = localStorage.getItem('user_name');
      this.renderArchiveCards();
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.navStatus = false;
  }

  public sortTitle() {
    this.isSortingDescription = true;
    this.isSortingDate = true;

    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      if (!this.isAscTaskName) {
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
        this.cardsArchive = this.cardsArchive.sort(function (a, b) {
          var textA = a.taskName.toUpperCase();
          var textB = b.taskName.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.isSortingTaskName = false;
        this.isAscTaskName = true;
      } else {
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
        this.isSortingTaskName = false;
        this.isAscTaskName = false;
      }
    });
  }

  public sortDescription() {
    this.isSortingDate = true;
    this.isSortingTaskName = true;

    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      if (!this.isAscDescription) {
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
        this.cardsArchive = this.cardsArchive.sort(function (a, b) {
          var textA = a.description.toUpperCase();
          var textB = b.description.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.isSortingDescription = false;
        this.isAscDescription = true;
      } else {
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
        this.isSortingDescription = false;
        this.isAscDescription = false;
      }
    });
  }

  public sortDate() {
    this.isSortingTaskName = true;
    this.isSortingDescription = true;

    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      if (!this.isAscDate) {
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
        this.cardsArchive = this.cardsArchive.sort((a: TodoCard, b: TodoCard) => b.id - a.id);
        this.isSortingDate = false;
        this.isAscDate = true;
      } else {
        this.cardsArchive = this.cardsAll.filter(x => x.status === 3);
        this.isSortingDate = false;
        this.isAscDate = false;
      }
    });
  }

  public isSortingAscDescTaskName() {
    if (this.isAscTaskName) {
      return true;
    } else {
      return false;
    }
  }

  public isSortingAscDescDescription() {
    if (this.isAscDescription) {
      return true;
    } else {
      return false;
    }
  }

  public isSortingAscDescDate() {
    if (this.isAscDate) {
      return true;
    } else {
      return false;
    }
  }

}
