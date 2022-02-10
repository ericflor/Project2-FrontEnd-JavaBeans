import { TestBed } from '@angular/core/testing';

import { DecisionsService } from './decisions.service';

describe('DecisionsService', () => {
  let service: DecisionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecisionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
