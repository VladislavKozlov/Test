import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';

const appRoutes: Routes = [
  { path: '', component: TodolistComponent } 
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);