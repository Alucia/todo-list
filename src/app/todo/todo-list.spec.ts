import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Todo } from './todo';
import { TodoList } from './todo-list';
import { ITodo } from './todo.interface';

describe('TodoList', () => {
  let classTesting: TodoList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [TodoList]
    }).compileComponents();

    classTesting = TestBed.inject(TodoList);
  });

  it('should create', () => {
    expect(classTesting).toBeTruthy();
  });
});
