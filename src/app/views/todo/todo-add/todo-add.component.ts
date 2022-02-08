import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppEventType } from 'src/app/todo/even-type';
import { TodoList } from 'src/app/todo/todo-list';
import { AppEvent, TodoService } from 'src/app/todo/todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.sass'],
})
export class TodoAddComponent extends TodoList implements OnInit, OnDestroy {
  todoForm: FormGroup;
  isEditable = false;
  idTask: number = 0;
  dataEditSubs: Subscription = new Subscription;

  constructor(
    injector: Injector,
    private todoService: TodoService
  ) {
    super(injector);
    this.todoForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    });
  }

  override ngOnInit(): void {
    this.getDataEditabled();
  }

  ngOnDestroy(): void {
    this.dataEditSubs.unsubscribe();
  }

  getDataEditabled() {
    this.dataEditSubs = this.todoService.get(AppEventType.OPTION_EDIT).subscribe((index: any) => {
      if (index) {
        console.log('index', index);
        this.idTask = Number(index?.payload);
        const value = this.listFiltered(this.idTask);
        this.todoForm.get('title')?.setValue(value[0].getTitle);
        this.todoForm.get('description')?.setValue(value[0].getDescription);
        this.isEditable = true;
      }
    });
  }

  // agregar 
  addTask(type: string) {
    let titleTask: string = this.todoForm.get('title')!.value;
    let descriptionTask: string = this.todoForm.get('description')!.value;

    if (titleTask.length > 0 && descriptionTask.length > 0) {
      if (type === 'ADD') {
        this.createItem({
          title: titleTask,
          description: descriptionTask,
        });
      } else if (type === 'EDIT') {
        this.editItem(this.idTask, {
          title: titleTask,
          description: descriptionTask,
        });
        this.isEditable = false;
      }
    }

    this.todoService.set(new AppEvent(AppEventType.OPTION_ADD, this.listItem()));
    this.cleanForm();
  }
  
  cleanForm() {
    this.todoForm.get('title')!.setValue('');
    this.todoForm.get('description')!.setValue('');
  }
}
