import { Component, ViewChild, Output, Input, TemplateRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { TodoCard } from '../models/todoCard';
import { TodoCardService } from '../todo-card.service';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  providers: [TodoCardService, NgbActiveModal]
})

export class TodolistComponent implements OnInit {

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
    status: 0,
    createDate: ''
  };

  @Input() modalTitle: string = "Add Task";

  @ViewChild("modal") public modal: NgbModalRef;
  @ViewChild('content') editModal: TemplateRef<any>;

  status: number = 0;
  failedTaskName = false;
  failedDescription = false;
  errorMessageTaskName = '';
  errorMessageDescription = '';
  taskName = '';
  description = '';
  id: number = 0;
  createDate: string;
  str: string;
  isInvalidClassTaskName = true;
  isInvalidClassDescription = true;

  constructor(private todoCardService: TodoCardService, private modalService: NgbModal, public activeModal: NgbActiveModal,
    private confirmationDialogService: ConfirmationDialogService) {
  }

  public renderCards() {
    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      this.cardsTodo = this.cardsAll.filter(x => x.status === 0);
      this.cardsInProgress = this.cardsAll.filter(x => x.status === 1);
      this.cardsDone = this.cardsAll.filter(x => x.status === 2);
    });
  }

  public validateModal() {
    var modalIsValid: boolean = false;
    this.str = this.taskName;
    if (this.taskName === '') {
      this.failedTaskName = true;
      this.errorMessageTaskName = "Title is required.";
    } else if (this.str.length <= 3) {
      this.failedTaskName = true;
      this.errorMessageTaskName = "Title must be at least 4 characters long.";
    } else {
      this.failedTaskName = false;
    }
    if (this.description === '') {
      this.failedDescription = true;
      this.errorMessageDescription = "Description is required.";
    } else {
      this.failedDescription = false;
    }
    if (this.failedTaskName == false && this.failedDescription == false) {
      modalIsValid = true;
    }
    return modalIsValid;
  }

  public prepareAddAndEditTodoCard() {
    if (this.validateModal()) {
      this.todoCard = new TodoCard();
      this.todoCard.id = this.id;
      this.todoCard.taskName = this.taskName;
      this.todoCard.createDate = this.createDate;
      this.todoCard.description = this.description;
      this.todoCard.status = this.status;

      if (this.id == 0) {
        this.closeModal();
        this.addTodoCard();
      } else {
        this.closeModal();
        this.updateTodoCard();
      }
    }
  }

  public addToArchive(id: number, taskName: string, createDate: string, description: string) {
    console.log("id = " + id);
    console.log("taskName = " + taskName);
    console.log("description = " + description);
    this.todoCard = new TodoCard();
    this.todoCard.id = id;
    this.todoCard.taskName = taskName;
    this.todoCard.createDate = createDate;
    this.todoCard.description = description;
    this.todoCard.status = 3;
    this.updateTodoCard();
  }

  public addTodoCard() {
    this.todoCardService.add(this.todoCard).subscribe(
      (data: TodoCard) => {
        this.todoCard = data;
        this.renderCards();
      }
    );
  }

  public updateTodoCard() {
    this.todoCardService.update(this.todoCard).subscribe(
      (data: TodoCard) => {
        this.todoCard = data;
        this.renderCards();
      }
    );
  }

  public openConfirmationDialog(id: number, content: any) {
    console.log("id = " + id);
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this?')
      .then((result) => {
        console.log('User confirmed:', result),
          this.closeResult = `Closed with ${this.removeTodoCard(id)}`;
      }
      ).catch(() => console.log('User dismissed the dialog'));
  }

  public removeTodoCard(id: number) {
    console.log("id = " + id);
    this.todoCardService.remove(id).subscribe(
      (data: number) => {
        id = data;
        this.renderCards();
      },
      error => console.log(error)
    );
  }

  public editTodoCard(id: number, taskName: string, createDate: string, description: string, status: number) {
    console.log("id = " + id);
    console.log("taskName = " + taskName);
    console.log("description = " + description);
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
    this.isInvalidClassTaskName = true;
    this.isInvalidClassDescription = true;
  }

  ngOnInit() {
    this.renderCards();
  }

  public valueChangeTaskName() {
    this.isInvalidClassTaskName = false;
  }

  public removeIsInvalidClassTaskName() {
    if (this.isInvalidClassTaskName) {
      return true;
    } else {
      return false;
    }    
  }

  public valueChangeDescription() {
    this.isInvalidClassDescription = false;
  }

  public removeIsInvalidClassDescription() {
    if (this.isInvalidClassDescription) {
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
      this.isInvalidClassTaskName = true;
      this.isInvalidClassDescription = true;
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
