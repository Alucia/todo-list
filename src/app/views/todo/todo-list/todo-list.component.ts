import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Todo } from 'src/app/todo/todo';
import { TodoList } from '../../../todo/todo-list';
import { Subscription } from 'rxjs';
import { AppEvent, TodoService } from 'src/app/todo/todo.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AppEventType } from 'src/app/todo/even-type';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
})
export class TodoListComponent extends TodoList implements OnInit, OnDestroy {
  tasks = TodoList.listTask;
  idTask: number = 0;
  isEditable = false;
  todoListGroup: FormGroup;
  listTaskSubs: Subscription = new Subscription;

  constructor(
    injector: Injector,
    private todoService: TodoService
  ) {
    super(injector);
    this.todoListGroup = new FormGroup({
      checkboxStatus: new FormControl()
    })
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getListTask();
  }

  ngOnDestroy(): void {
    this.listTaskSubs.unsubscribe();
  }

  getListTask() {
    this.listTaskSubs = this.todoService.get(AppEventType.OPTION_ADD).subscribe((value: any) => {
      if (value) {
        this.tasks = value?.payload;
      }
    });
  }

  // eliminar
  deleteTask(index: number) {
    this.deleteItem(index);
    this.todoService.set(new AppEvent(AppEventType.OPTION_ADD, this.listItem()));
  }
  
  // actualizar estado
  updateTask(index: number) {
    const value: Todo[] = this.listFiltered(index);

    this.updateStatusItem(index, {
      title: value[0]!.getTitle,
      description: value[0]!.getDescription,
      status: value[0]!.getStatus,
    });
    this.todoService.set(new AppEvent(AppEventType.OPTION_ADD, this.listItem()));
  }

  // editar
  editTask(index: number) {
    this.todoService.set(new AppEvent(AppEventType.OPTION_EDIT, index));
  };
}
