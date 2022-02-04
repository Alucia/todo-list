import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './todo.component';
import { TodoListModule } from './todo-list/todo-list.module';
import { TodoAddModule } from './todo-add/todo-add.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TodoListModule,
    TodoAddModule,
    ComponentsModule
  ],
  declarations: [
    TodoComponent,
  ],
  exports: [
    TodoComponent,
  ],
})
export class TodoModule { }
