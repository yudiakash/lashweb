import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRegistration2Component } from './workshop-registration2.component';

describe('WorkshopRegistration2Component', () => {
  let component: WorkshopRegistration2Component;
  let fixture: ComponentFixture<WorkshopRegistration2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkshopRegistration2Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopRegistration2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
