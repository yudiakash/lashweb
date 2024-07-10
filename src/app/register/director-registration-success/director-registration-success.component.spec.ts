import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorRegistrationSuccessComponent } from './director-registration-success.component';

describe('DirectorRegistrationSuccessComponent', () => {
  let component: DirectorRegistrationSuccessComponent;
  let fixture: ComponentFixture<DirectorRegistrationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectorRegistrationSuccessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorRegistrationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
