import { TestBed } from '@angular/core/testing';

import { HouseService } from './house.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HouseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: HouseService = TestBed.get(HouseService);
    expect(service).toBeTruthy();
  });
});
