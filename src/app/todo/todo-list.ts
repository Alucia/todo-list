import { Component, Injector, OnInit } from "@angular/core";
import { Todo } from "./todo";
import { ITodo } from "./todo.interface";

@Component({
  template: ''
})
export class TodoList implements OnInit {
  public static listTask: Todo[] = [];
  instance: any;

  constructor(public injector: Injector) {
    this.instance = this;
  }

  ngOnInit(): void {
    console.log(this)
  }

  listItem(): string[] {
    const list = TodoList.listTask.map((val, index) => {
      index++;
      return `${index} - ${val.fullTask}`
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
    TodoList.listTask[idTask - 1] = editedItem;
    return TodoList.listTask;   
  }

  deleteItem(idTask: number): Todo[] {
    TodoList.listTask = TodoList.listTask.filter((val, index) => {
      return index !== idTask -1;
    });
    return TodoList.listTask;   
  }

  updateStatusItem(idTask: number, item: ITodo): Todo[] {
    const status = !item.status;
    const updatedItem = new Todo(item.title, item.description, status);

    TodoList.listTask[idTask - 1] = updatedItem;

    return TodoList.listTask;   
  }

}
