import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragulaModule } from 'ng2-dragula';
import { UserService } from './user.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { ArchivetasksComponent } from './components/archivetasks/archivetasks.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './components/confirmation-dialog/confirmation-dialog.service';

@NgModule({
  imports: [
    BrowserModule,
    DragulaModule.forRoot(),
    NgbModule,
    UserService,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    TodolistComponent,
    ArchivetasksComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [NgbModal, ConfirmationDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
