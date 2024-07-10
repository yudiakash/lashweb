import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRegistration3Component } from './workshop-registration3.component';

describe('WorkshopRegistration3Component', () => {
  let component: WorkshopRegistration3Component;
  let fixture: ComponentFixture<WorkshopRegistration3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkshopRegistration3Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopRegistration3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
