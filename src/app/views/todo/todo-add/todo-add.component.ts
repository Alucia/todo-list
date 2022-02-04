import { Component, Injector } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigConstants } from 'src/app/todo/constants';
import { TodoList } from 'src/app/todo/todo-list';
import { TodoService } from 'src/app/todo/todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.sass'],
})
export class TodoAddComponent extends TodoList {
  todoForm: FormGroup;
  isEditable = false;
  title: string = '';
  description: string = '';
  tasks: string[] = [];
  idTask: number = 0;

  constructor(
    injector: Injector,
    private todoService: TodoService
  ) {
    super(injector);
    this.todoForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    })
  }

  getTitleFromInput(title: string) {
    this.title = title;
  }

  getDescriptionFromInput(description: string) {
    this.description = description;
  }

  // agregar 
  addTask() {

    let titleTask: string = this.todoForm.get('title')?.value;
    let descriptionTask: string = this.todoForm.get('description')?.value;
    
    if (titleTask.length > 0 && descriptionTask.length > 0) {
      this.createItem({
        title: titleTask,
        description: descriptionTask,
      });
      this.tasks = this.listItem();
      // this.notification(ConfigConstants.OPTIONS.OPTION_ADD, this.tasks);
      this.todoService.setData(this.tasks)
      this.title = '';
      this.description = '';
    }
  }
  
  saveTask() {
    this.editItem(this.idTask, {
      title: this.title,
      description: this.description,
    });
    this.tasks = this.listItem();
    this.title = '';
    this.description = '';
  }
}
