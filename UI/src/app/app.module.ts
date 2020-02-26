import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DragulaModule } from 'ng2-dragula';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    NgbModalBackdrop,
    NgbModalWindow,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [NgbModalBackdrop, NgbModalWindow, ConfirmationDialogComponent],
  providers: [NgbModal, NgbModalStack, ConfirmationDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
