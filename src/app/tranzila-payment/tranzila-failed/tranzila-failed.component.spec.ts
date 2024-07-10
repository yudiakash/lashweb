import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranzilaFailedComponent } from './tranzila-failed.component';

describe('TranzilaFailedComponent', () => {
  let component: TranzilaFailedComponent;
  let fixture: ComponentFixture<TranzilaFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranzilaFailedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranzilaFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
