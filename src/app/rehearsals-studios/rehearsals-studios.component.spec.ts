import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RehearsalsStudiosComponent } from './rehearsals-studios.component';

describe('RehearsalsStudiosComponent', () => {
  let component: RehearsalsStudiosComponent;
  let fixture: ComponentFixture<RehearsalsStudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RehearsalsStudiosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RehearsalsStudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
