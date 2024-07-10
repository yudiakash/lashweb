import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinAsActorComponent } from './join-as-actor.component';

describe('JoinAsActorComponent', () => {
  let component: JoinAsActorComponent;
  let fixture: ComponentFixture<JoinAsActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinAsActorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinAsActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
