import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredStatisticsComponent } from './expired-statistics.component';

describe('ExpiredStatisticsComponent', () => {
  let component: ExpiredStatisticsComponent;
  let fixture: ComponentFixture<ExpiredStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
