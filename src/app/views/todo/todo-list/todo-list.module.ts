import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TodoListComponent,
  ],
  exports: [
    TodoListComponent,
  ],
})
export class TodoListModule { }
