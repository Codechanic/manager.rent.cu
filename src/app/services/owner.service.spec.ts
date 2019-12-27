import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OwnerService } from './owner.service';

describe('OwnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: OwnerService = TestBed.get(OwnerService);
    expect(service).toBeTruthy();
  });
});
