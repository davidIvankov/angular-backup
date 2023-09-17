import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepieEditComponent } from './recepie-edit.component';

describe('RecepieEditComponent', () => {
  let component: RecepieEditComponent;
  let fixture: ComponentFixture<RecepieEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepieEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepieEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
