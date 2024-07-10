import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingCallDetailsComponent } from './casting-call-details.component';

describe('CastingCallDetailsComponent', () => {
  let component: CastingCallDetailsComponent;
  let fixture: ComponentFixture<CastingCallDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CastingCallDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingCallDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
