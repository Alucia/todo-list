import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { ButtonModule } from 'src/app/components/button/button.module';
import { InputModule } from 'src/app/components/input/input.module';
import { AppEventType } from 'src/app/todo/even-type';
import { Todo } from 'src/app/todo/todo';
import { TodoList } from 'src/app/todo/todo-list';
import { AppEvent, TodoService } from 'src/app/todo/todo.service';
import { TodoAddComponent } from './todo-add.component';

describe('TodoAddComponent', () => {
  let component: TodoAddComponent;
  let fixture: ComponentFixture<TodoAddComponent>;
  let todoService: TodoService;
  let todoList: TodoList;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        InputModule,
        ButtonModule,
      ],
      declarations: [
        TodoAddComponent,
      ],
      providers: [TodoService, TodoList],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(TodoAddComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    todoList = TestBed.inject(TodoList);
    component.todoForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be add task from Todo form', () => {
    spyOn(component, 'createItem');
    component.todoForm.get('title')?.setValue('Tarea');
    component.todoForm.get('description')?.setValue('descripcion');

    const type = 'ADD';
    component.addTask(type);

    expect(component.createItem).toHaveBeenCalled();
  });

  it('Should be save task from Todo form', () => {
    spyOn(component, 'editItem');
    component.todoForm.get('title')!.setValue('Tarea');
    component.todoForm.get('description')!.setValue('descripcion');

    const type = 'EDIT';
    component.addTask(type);

    expect(component.editItem).toHaveBeenCalled();
    expect(component.isEditable).toBeFalsy();
  });

  it('Should be clear form', () => {
    component.todoForm.get('title')?.setValue('Tarea');
    component.todoForm.get('description')?.setValue('descripcion');

    component.cleanForm();
    expect(component.todoForm.get('title')?.value).toEqual('');
    expect(component.todoForm.get('description')?.value).toEqual('');
  });

  // it('Should be set data Todo form', () => {
  //   component.todoForm.get('title')?.setValue('Tarea');
  //   component.todoForm.get('description')?.setValue('descripcion');
  //   const obs = new Observable();

  //   const index = 0;

  //   spyOn(todoService, 'get');
  //   component.getDataEditabled();
  //   todoService.set(new AppEvent(AppEventType.OPTION_EDIT, index));
  //   // todoService.get(AppEventType.OPTION_EDIT).subscribe((value: any) => {
  //   //   expect(component.isEditable).toBeFalse();
  //   //   expect(component.idTask).toEqual(value.payload);
  //   // });
  //   // expect(todoService.get).toHaveBeenCalled();
  // });
});
