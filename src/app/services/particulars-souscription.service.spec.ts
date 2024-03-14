import { TestBed } from '@angular/core/testing';

import { ParticularsSouscriptionService } from './particulars-souscription.service';

describe('ParticularsSouscriptionService', () => {
  let service: ParticularsSouscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticularsSouscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
