import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoAddComponent } from './todo-add.component';
import { InputModule } from 'src/app/components/input/input.module';
import { ButtonModule } from '../../../components/button/button.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule
  ],
  declarations: [
    TodoAddComponent,
  ],
  exports: [
    TodoAddComponent,
  ],
})
export class TodoAddModule { }
