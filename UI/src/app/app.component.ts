import { Component, ViewChild, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { TodoCard } from './models/todoCard';
import { TodoCardService } from './todo-card.service';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoCardService, NgbActiveModal]
})

export class AppComponent implements OnInit {

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
    status: 0
  };

  @ViewChild("modal") public modal: NgbModalRef;
  taskName = '';
  description = '';
  status: number;
  failedTaskName = false;
  failedDescription = false;
  errorMessageTaskName = '';
  errorMessageDescription = '';
  modalClose = false;
  str: String;

  constructor(private todoCardService: TodoCardService, private modalService: NgbModal, public activeModal: NgbActiveModal) {
  }

  private renderCards() {
    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      this.cardsTodo = this.cardsAll.filter(x => x.status === 0);
      this.cardsInProgress = this.cardsAll.filter(x => x.status === 1);
      this.cardsDone = this.cardsAll.filter(x => x.status === 2);
    },
      error => console.error(error));
  }

  addTodoCard() {
    this.str = new String(this.taskName);
    if (this.taskName === '') {
      this.failedTaskName = true;
      this.errorMessageTaskName = "Title is required.";
    } else if (this.str.length <= 3 ) {    
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
      this.modalClose = true;
    }

    if (this.modalClose) {
      this.modal.close();
      this.todoCard = new TodoCard();
      this.todoCard.taskName = this.taskName;
      this.todoCard.description = this.description;
      this.todoCardService.add(this.todoCard).subscribe(
        (data: TodoCard) => { this.todoCard = data; this.renderCards(); },
        error => console.log(error)
      );
    }
  }

  removeTodoCard(todoCard: TodoCard) {
    this.todoCardService.remove(todoCard.id).subscribe(
      (data: TodoCard) => { this.todoCard = data },
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.renderCards();
  }

  open(content: any) {
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
