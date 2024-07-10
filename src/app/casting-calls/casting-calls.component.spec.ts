import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingCallsComponent } from './casting-calls.component';

describe('CastingCallsComponent', () => {
  let component: CastingCallsComponent;
  let fixture: ComponentFixture<CastingCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CastingCallsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
