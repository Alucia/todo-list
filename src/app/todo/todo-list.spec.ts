import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppEventType } from './even-type';
import { Todo } from './todo';
import { TodoList } from './todo-list';
import { ITodo } from './todo.interface';
import { AppEvent, TodoService } from './todo.service';

describe('TodoList', () => {
  let classTesting: TodoList;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        TodoList,
        TodoService
      ]
    }).compileComponents();

    classTesting = TestBed.inject(TodoList);
    todoService = TestBed.inject(TodoService);
  });

  it('should create', () => {
    expect(classTesting).toBeTruthy();
  });

  // it('should be delete item', () => {
  //   spyOn(todoService, 'set');
  //   const newOption = new AppEvent(AppEventType.OPTION_ADD, classTesting.listItem);
  //   const index = 1;
  //   deleteItem(index);
  //   expect(todoService.set).toHaveBeenCalled()
  // });
});
