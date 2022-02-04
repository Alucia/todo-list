import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be get title from input', () => {
    const title = 'Título';
    component.getTitleFromInput(title);
    expect(component.title).toEqual(title);
  });

  it('should be get description from input', () => {
    const description = 'Descripción';
    component.getDescriptionFromInput(description);
    expect(component.description).toEqual(description);
  });

  it('should be add task', () => {
    spyOn(component, 'createItem');
    component.title = 'Titulo';
    component.description = 'Descripción';
    component.addTask();
    expect(component.createItem).toHaveBeenCalled();
  });

  it('should be delete task', () => {
    spyOn(component, 'deleteItem');
    component.title = 'Titulo';
    component.description = 'Descripción';
    component.addTask();
    component.listItem();
    const item = '1 - Titulo Descripción - Estado: "Pendiente"';
    component.deleteTask(item);
    expect(component.deleteItem).toHaveBeenCalled();
  });

  it('should be update status task', () => {
    spyOn(component, 'updateStatusItem');
    component.title = 'Titulo';
    component.description = 'Descripción';
    component.addTask();
    component.listItem();
    const item = '1 - Titulo Descripción - Estado: "Pendiente"';
    component.updateTask(item);
    expect(component.updateStatusItem).toHaveBeenCalled();
  });

  it('should be edit task', () => {
    component.title = 'Titulo';
    component.description = 'Descripción';
    component.addTask();
    component.listItem();
    const item = '1 - Titulo Descripción - Estado: "Pendiente"';
    component.editTask(item);
    expect(component.title).toEqual('Titulo');
    expect(component.description).toEqual('Descripción');
  });

  it('should be save task after edit', () => {
    spyOn(component, 'editItem');
    component.saveTask();
    expect(component.editItem).toHaveBeenCalled();
    expect(component.title).toEqual('');
    expect(component.description).toEqual('');
  });
});
