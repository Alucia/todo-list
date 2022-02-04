import { Component, Injector } from '@angular/core';
import { Todo } from 'src/app/todo/todo';
import { TodoList } from '../../../todo/todo-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
})
export class TodoListComponent extends TodoList {

  title: string = '';
  description: string = '';
  tasks: string[] = [];
  idTask: number = 0;
  isEditable = false;

  constructor(injector: Injector) {
    super(injector);
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
