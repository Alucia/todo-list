import { Component, Injector, OnInit } from "@angular/core";
import { Todo } from "./todo";
import { ITodo } from "./todo.interface";
import { TodoService } from './todo.service';

@Component({
  template: ''
})
export class TodoList extends TodoService implements OnInit {
  public static listTask: Todo[] = [];
  instance: any;

  constructor(public injector: Injector) {
    super();
  }

  ngOnInit(): void {
    console.log(this)
  }

  listItem(): Todo[] {
    return TodoList.listTask;
  }

  listFiltered(index: number): Todo[] {
    const list = TodoList.listTask.filter((val, i) => {
      return i === index;
    });
    return list;
  }

  createItem(item: ITodo): Todo[] {
    const newItem = new Todo(item.title, item.description);
    TodoList.listTask.push(newItem);
    return TodoList.listTask;
  }

  editItem(idTask: number, item: ITodo): Todo[] {
    const editedItem = new Todo(item.title, item.description);
    TodoList.listTask[idTask] = editedItem;
    return TodoList.listTask;   
  }

  deleteItem(idTask: number): Todo[] {
    TodoList.listTask = TodoList.listTask.filter((val, index) => {
      return index !== idTask;
    });
    return TodoList.listTask;   
  }

  updateStatusItem(idTask: number, item: ITodo): Todo[] {
    const status = !item.status;
    const updatedItem = new Todo(item.title, item.description, status);

    TodoList.listTask[idTask] = updatedItem;

    return TodoList.listTask;   
  }

}
