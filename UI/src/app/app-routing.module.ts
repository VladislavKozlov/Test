import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { ArchivetasksComponent } from './components/archivetasks/archivetasks.component';

const routes: Routes = [
  { path: '', redirectTo: '/todolist', pathMatch: 'full' },
  { path: 'todolist', component: TodolistComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'archivetasks', component: ArchivetasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
