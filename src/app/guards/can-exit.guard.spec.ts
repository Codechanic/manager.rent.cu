import { TestBed, async, inject } from '@angular/core/testing';

import { CanExitGuard } from './can-exit.guard';

describe('CanExitGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanExitGuard]
    });
  });

  it('should ...', inject([CanExitGuard], (guard: CanExitGuard) => {
    expect(guard).toBeTruthy();
  }));
});
