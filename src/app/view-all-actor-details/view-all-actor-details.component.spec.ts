import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllActorDetailsComponent } from './view-all-actor-details.component';

describe('ViewAllActorDetailsComponent', () => {
  let component: ViewAllActorDetailsComponent;
  let fixture: ComponentFixture<ViewAllActorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllActorDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllActorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
