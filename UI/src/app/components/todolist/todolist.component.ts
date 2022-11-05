import { Component, ViewChild, Output, Input, TemplateRef, HostListener } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoCard } from './../../models/todoCard';
import { TodoCardService } from './../../todo-card.service';
import { UserService } from './../../user.service';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  providers: [TodoCardService, NgbActiveModal]
})

export class TodolistComponent implements OnInit, OnDestroy {

  title = 'Todo UI';
  cardsAll: Array<TodoCard>;
  cardsTodo: Array<TodoCard>;
  cardsInProgress: Array<TodoCard>;
  cardsDone: Array<TodoCard>;
  closeResult: string;

  @Output() public todoCard: TodoCard = {
    id: 0,
    taskName: '',
    description: '',
    userName: '',
    status: 0,
    createDate: ''
  };

  @Input() modalTitle: string = "Add Task";

  @ViewChild("modal") public modal: NgbModalRef;
  @ViewChild('content') editModal: TemplateRef<any>;
  navStatus: boolean = false;
  subscription: Subscription;
  status: number = 0;
  failedTaskName = false;
  failedDescription = false;
  errors = false;
  modelStateErrors = null;
  errorMessageTaskName = '';
  errorMessageDescription = '';
  taskName = '';
  description = '';
  userName = '';
  id: number = 0;
  createDate: string;
  strTaskName: string;
  strDescription: string;
  searchValue: string = '';

  constructor(private todoCardService: TodoCardService, private modalService: NgbModal, public activeModal: NgbActiveModal,
    private confirmationDialogService: ConfirmationDialogService, private userService: UserService, private router: Router, private dragulaService: DragulaService) { }

  public renderCards() {
    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      this.cardsTodo = this.cardsAll.filter(x => x.status === 0 && x.userName === this.userName);
      this.cardsInProgress = this.cardsAll.filter(x => x.status === 1 && x.userName === this.userName);
      this.cardsDone = this.cardsAll.filter(x => x.status === 2 && x.userName === this.userName);
    });
  }

  public validateModal() {
    var modalIsValid: boolean = false;
    this.strTaskName = this.taskName;
    this.strDescription = this.description;
    if (this.taskName === '') {
      this.failedTaskName = true;
      this.errorMessageTaskName = "Title is required.";
    } else if (this.strTaskName.length <= 3) {
      this.failedTaskName = true;
      this.errorMessageTaskName = "Title must be at least 4 characters long.";
    } else {
      this.failedTaskName = false;
    }
    if (this.description === '') {
      this.failedDescription = true;
      this.errorMessageDescription = "Description is required.";
    }
    else if (this.strDescription.length > 1000) {
      this.failedDescription = true;
      this.errorMessageDescription = "The field Description must be a string with a maximum length of 1000.";
    }
    else {
      this.failedDescription = false;
    }
    if (this.failedTaskName == false && this.failedDescription == false) {
      modalIsValid = true;
    }
    return modalIsValid;
  }

  public prepareAddAndEditTodoCard() {
    if (this.errors) {
      localStorage.removeItem('modelStateErrors');
      this.modelStateErrors = '';
      this.errors = false;
    }
    if (this.validateModal()) {
      this.todoCard = new TodoCard();
      this.todoCard.id = this.id;
      this.todoCard.taskName = this.taskName;
      this.todoCard.createDate = this.createDate;
      this.todoCard.description = this.description;
      this.todoCard.userName = this.userName;
      this.todoCard.status = this.status;

      if (this.id == 0) {
        this.addTodoCard();
      } else {
        this.updateTodoCard();
      }
    }
  }

  public addToArchive(id: number, taskName: string, createDate: string, description: string, userName: string) {
    this.todoCard = new TodoCard();
    this.todoCard.id = id;
    this.todoCard.taskName = taskName;
    this.todoCard.createDate = createDate;
    this.todoCard.description = description;
    this.todoCard.userName = userName;
    this.todoCard.status = 3;
    this.updateTodoCard();
  }

  public addTodoCard() {
    this.todoCardService.add(this.todoCard).subscribe(
      (data: TodoCard) => {
        this.todoCard = data;
        this.modelStateErrors = localStorage.getItem('modelStateErrors');
        if (this.modelStateErrors != null) {
          this.errors = true;
        }
        else {
          this.closeModal();
          this.renderCards();
        }
      }
    );
  }

  public updateTodoCard() {
    this.todoCardService.update(this.todoCard).subscribe(
      (data: TodoCard) => {
        this.todoCard = data;
        this.modelStateErrors = localStorage.getItem('modelStateErrors');
        if (this.modelStateErrors != null) {
          this.errors = true;
        }
        else {
          this.closeModal();
          this.renderCards();
        }
      }
    );
  }

  public openConfirmationDialog(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this?')
      .then((result) => {
        console.log('User confirmed:', result),
          this.closeResult = `Closed with ${this.removeTodoCard(id)}`;
      }
      ).catch(() => console.log('User dismissed the dialog'));
  }

  public removeTodoCard(id: number) {
    this.todoCardService.remove(id).subscribe(
      (data: number) => {
        id = data;
        this.renderCards();
      },
      error => console.log(error)
    );
  }

  public editTodoCard(id: number, taskName: string, createDate: string, description: string, status: number) {
    this.modalTitle = "Edit Task";
    this.id = id;
    this.description = description;
    this.taskName = taskName;
    this.createDate = createDate;
    this.status = status;
    this.open(this.editModal);
  }

  public closeModal() {
    this.modal.close();
    this.failedTaskName = false;
    this.failedDescription = false;
    this.id = 0;
    this.taskName = '';
    this.description = '';
    this.createDate = undefined;
    this.status = 0;
    this.modalTitle = "Add Task";
  }

  @HostListener('document:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.searchValue = localStorage.getItem('search_value');
  }

  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(navStatus => this.navStatus = navStatus);
    if (this.navStatus) {
      this.userName = localStorage.getItem('user_name');
      this.renderCards();
    }
    else {
      this.router.navigate(['/login']);
    }
    this.dragulaService.createGroup("DRAGULA_FACTS", {
      removeOnSpill: true
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.navStatus = false;
    this.dragulaService.destroy("DRAGULA_FACTS");
  }

  public valueChangeTaskName() {
    this.failedTaskName = false;
    if (this.errors) {
      localStorage.removeItem('modelStateErrors');
      this.modelStateErrors = '';
      this.errors = false;
    }
  }

  public isfailedTaskName() {
    if (this.failedTaskName) {
      return true;
    } else {
      return false;
    }
  }

  public valueChangeDescription() {
    this.failedDescription = false;
    if (this.errors) {
      localStorage.removeItem('modelStateErrors');
      this.modelStateErrors = '';
      this.errors = false;
    }
  }

  public isfailedDescription() {
    if (this.failedDescription) {
      return true;
    } else {
      return false;
    }
  }

  public open(content: any) {
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.failedDescription = false;
      this.failedTaskName = false;
      this.id = 0;
      this.status = 0;
      this.taskName = '';
      this.description = '';
      this.createDate = undefined;
      this.modalTitle = "Add Task";
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
