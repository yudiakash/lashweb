import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYourDetailsComponent } from './add-your-details.component';

describe('AddYourDetailsComponent', () => {
  let component: AddYourDetailsComponent;
  let fixture: ComponentFixture<AddYourDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddYourDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYourDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
