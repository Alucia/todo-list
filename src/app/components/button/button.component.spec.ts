import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GrouButtonComponent } from './grou-button.component';

describe('GrouButtonComponent', () => {
  let component: GrouButtonComponent;
  let fixture: ComponentFixture<GrouButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [GrouButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
