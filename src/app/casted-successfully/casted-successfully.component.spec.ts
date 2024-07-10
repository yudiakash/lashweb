import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastedSuccessfullyComponent } from './casted-successfully.component';

describe('CastedSuccessfullyComponent', () => {
  let component: CastedSuccessfullyComponent;
  let fixture: ComponentFixture<CastedSuccessfullyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CastedSuccessfullyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
