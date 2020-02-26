import { Component, ViewChild, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { TodoCard } from './models/todoCard';
import { TodoCardService } from './todo-card.service';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';

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
    status: 0,
    createDate: ''
  };

  @ViewChild("modal") public modal: NgbModalRef;
  status: number;
  failedTaskName = false;
  failedDescription = false;
  errorMessageTaskName = '';
  errorMessageDescription = '';
  modalClose = false;
  taskName = new FormControl('');
  description = new FormControl('');

  constructor(private todoCardService: TodoCardService, private modalService: NgbModal, public activeModal: NgbActiveModal,
    private confirmationDialogService: ConfirmationDialogService) {
  }

  private renderCards() {
    this.todoCardService.getAll().subscribe((data: Array<TodoCard>) => {
      this.cardsAll = data;
      this.cardsTodo = this.cardsAll.filter(x => x.status === 0);
      this.cardsInProgress = this.cardsAll.filter(x => x.status === 1);
      this.cardsDone = this.cardsAll.filter(x => x.status === 2);
    });
  }

  addTodoCard() {
    this.taskName = new FormControl(this.taskName.value, [
      Validators.required,
      Validators.minLength(4)
    ]);
    this.description = new FormControl(this.description.value, Validators.required);
    if (this.taskName.valid == false) {
      this.failedTaskName = true;
      this.errorMessageTaskName = "Title is required or title must be at least 4 characters long.";
    } else {
      this.failedTaskName = false;
    }
    if (this.description.valid == false) {
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
      this.todoCard.taskName = this.taskName.value;
      this.todoCard.description = this.description.value;
      this.todoCardService.add(this.todoCard).subscribe(
        (data: TodoCard) => { this.todoCard = data; this.renderCards(); }
      );
    }
  }

  public openConfirmationDialog(id: number) {
    console.log("id = " + id);
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete this?')
      .then((result) => {
        console.log('User confirmed:', result),
          this.closeResult = `Closed with ${this.removeTodoCard(id)}`;
      }
      ).catch(() => console.log('User dismissed the dialog'));
  }

  removeTodoCard(id: number) {
    console.log("id = " + id);
    if (id != 0) {
      this.todoCardService.remove(id).subscribe(
        (data: number) => { id = data; this.renderCards(); },
        error => console.log(error)
      );
    }
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
