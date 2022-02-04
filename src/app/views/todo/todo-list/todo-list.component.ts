import { AfterContentChecked, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Todo } from 'src/app/todo/todo';
import { TodoList } from '../../../todo/todo-list';
import { ConfigConstants } from 'src/app/todo/constants';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/todo/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
})
export class TodoListComponent extends TodoList implements OnInit, AfterContentChecked, OnDestroy {

  title: string = '';
  description: string = '';
  tasks: string[] = [];
  idTask: number = 0;
  isEditable = false;
  listTaskSubs: Subscription = new Subscription;

  constructor(
    injector: Injector,
    private todoService: TodoService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    console.log('ng On init');
    // this.listTaskSubs = this.subscribe(ConfigConstants.OPTIONS.OPTION_ADD, (tasks) => {
    //   console.log('this.tasks', this.tasks, tasks);
    //   this.tasks = tasks
    // });
    this.todoService.data.subscribe((value) => {
      this.tasks = value;
    });
    // this.suscribe(nombre1, nombre2).suscribe(ress=>{})
  }
  
  ngAfterContentChecked() {
  }
  
  ngOnDestroy(): void {
    this.listTaskSubs.unsubscribe();
  }

  // eliminar
  deleteTask(item: string) {
    console.log('item', item)
    const idTask = Number(item.split(' -')[0]);
    this.deleteItem(idTask);
    this.tasks = this.listItem();
  }
  
  // actualizar estado
  updateTask(item: string) {
    const idTask = Number(item.split(' -')[0]);

    const value: Todo[] = TodoList.listTask.filter((val, index) => {
      return index === idTask - 1;
    });

    this.updateStatusItem(idTask, {
      title: value[0]!.getTitle,
      description: value[0]!.getDescription,
      status: value[0]!.getStatus,
    });
    this.tasks = this.listItem();
  }

    // editar
    editTask(item: string) {
      this.tasks = this.listItem();
      const idTask = Number(item.split(' -')[0]);
  
      if (idTask !== null && typeof idTask === 'number') {
        const value = TodoList.listTask.filter((val, index) => {
          return index === idTask - 1;
        });
  
        this.title = value[0].getTitle;
        this.description = value[0].getDescription;
        this.idTask = idTask;
        this.isEditable = true;
      }
    };
}
