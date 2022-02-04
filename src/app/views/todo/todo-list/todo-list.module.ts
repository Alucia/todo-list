import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from 'src/app/todo/todo.service';

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
  providers: [
    TodoService
  ]
})
export class TodoListModule { }
