import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ManagerService } from './manager.service';

describe('ManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ManagerService = TestBed.get(ManagerService);
    expect(service).toBeTruthy();
  });
});
