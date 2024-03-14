import { TestBed } from '@angular/core/testing';

import { EmployeesSouscriptionService } from './employees-souscription.service';

describe('EmployeesSouscriptionService', () => {
  let service: EmployeesSouscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesSouscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
