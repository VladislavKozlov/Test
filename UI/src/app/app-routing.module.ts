import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodolistComponent } from './components/todolist/todolist.component';
import { ArchivetasksComponent } from './components/archivetasks/archivetasks.component';

const routes: Routes = [
  { path: '', redirectTo: '/todolist', pathMatch: 'full' },
  { path: 'todolist', component: TodolistComponent },
  { path: 'archivetasks', component: ArchivetasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
