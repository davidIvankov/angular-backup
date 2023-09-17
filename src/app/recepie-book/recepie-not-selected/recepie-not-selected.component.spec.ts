import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepieNotSelectedComponent } from './recepie-not-selected.component';

describe('RecepieNotSelectedComponent', () => {
  let component: RecepieNotSelectedComponent;
  let fixture: ComponentFixture<RecepieNotSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepieNotSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepieNotSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
