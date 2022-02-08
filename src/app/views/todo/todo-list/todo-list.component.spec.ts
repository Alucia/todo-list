import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { AppEventType } from 'src/app/todo/even-type';
import { Todo } from 'src/app/todo/todo';
import { TodoList } from 'src/app/todo/todo-list';
import { AppEvent, TodoService } from 'src/app/todo/todo.service';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;
  let todoList: TodoList;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CheckboxModule,
        ReactiveFormsModule,
      ],
      declarations: [
        TodoListComponent,
      ],
      providers: [TodoList, TodoService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    todoList = TestBed.inject(TodoList);
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be delete item', () => {
    spyOn(todoService, 'set');
    const newOption = new AppEvent(AppEventType.OPTION_ADD, todoList.listItem());
    const index = 0;
    component.deleteTask(index);
    expect(todoService.set).toHaveBeenCalledWith(newOption);
    fixture.destroy();
    fixture.detectChanges();
  });

  it('should be update item', () => {
    spyOn(todoService, 'set');
    spyOn(todoList, 'createItem');
    const index = 0;
    const newItem = new Todo('title', 'description');
    TodoList.listTask.push(newItem);
    component.listFiltered(index);
    const newOption = new AppEvent(AppEventType.OPTION_ADD, todoList.listItem());
    component.updateTask(index);
    expect(todoService.set).toHaveBeenCalledWith(newOption);
    fixture.destroy();
  });

  it('should be edit item', () => {
    spyOn(todoService, 'set');
    spyOn(todoList, 'editItem');
    const index = 0;
    const newItem = new Todo('title', 'description');
    TodoList.listTask.push(newItem);
    const newOption = new AppEvent(AppEventType.OPTION_EDIT, index);
    component.editTask(index);
    expect(todoService.set).toHaveBeenCalledWith(newOption);
  });
});
