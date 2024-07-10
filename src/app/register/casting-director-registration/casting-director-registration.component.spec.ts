import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingDirectorRegistrationComponent } from './casting-director-registration.component';

describe('CastingDirectorRegistrationComponent', () => {
  let component: CastingDirectorRegistrationComponent;
  let fixture: ComponentFixture<CastingDirectorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CastingDirectorRegistrationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingDirectorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
