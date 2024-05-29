import { TestBed } from '@angular/core/testing';

import { UserAccountGuard } from './user-account.guard';

describe('UserAccountGuard', () => {
  let guard: UserAccountGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserAccountGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
