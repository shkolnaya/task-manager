import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneTaskMessageComponent } from './done-task-message.component';

describe('DoneTaskMessageComponent', () => {
  let component: DoneTaskMessageComponent;
  let fixture: ComponentFixture<DoneTaskMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneTaskMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoneTaskMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
