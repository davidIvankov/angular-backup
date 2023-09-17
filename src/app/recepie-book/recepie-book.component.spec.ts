import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepieBookComponent } from './recepie-book.component';

describe('RecepieBookComponent', () => {
  let component: RecepieBookComponent;
  let fixture: ComponentFixture<RecepieBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepieBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepieBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
