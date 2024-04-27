import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarStatisticsComponent } from './calendar-statistics.component';

describe('CalendarStatisticsComponent', () => {
  let component: CalendarStatisticsComponent;
  let fixture: ComponentFixture<CalendarStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
