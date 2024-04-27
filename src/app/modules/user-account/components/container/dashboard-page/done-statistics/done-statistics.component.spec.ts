import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneStatisticsComponent } from './done-statistics.component';

describe('DoneStatisticsComponent', () => {
  let component: DoneStatisticsComponent;
  let fixture: ComponentFixture<DoneStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoneStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
