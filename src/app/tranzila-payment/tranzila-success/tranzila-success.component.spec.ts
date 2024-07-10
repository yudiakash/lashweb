import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranzilaSuccessComponent } from './tranzila-success.component';

describe('TranzilaSuccessComponent', () => {
  let component: TranzilaSuccessComponent;
  let fixture: ComponentFixture<TranzilaSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranzilaSuccessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranzilaSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
