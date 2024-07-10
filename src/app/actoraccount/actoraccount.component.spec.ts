import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActoraccountComponent } from './actoraccount.component';

describe('ActoraccountComponent', () => {
  let component: ActoraccountComponent;
  let fixture: ComponentFixture<ActoraccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActoraccountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActoraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
