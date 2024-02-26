import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickIconComponent } from './pick-icon.component';

describe('PickIconComponent', () => {
  let component: PickIconComponent;
  let fixture: ComponentFixture<PickIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
