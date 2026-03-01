import { TestBed } from '@angular/core/testing';

import { ParkDesignService } from './park-design.service';

describe('ParkDesignService', () => {
  let service: ParkDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
