import { TestBed } from '@angular/core/testing';

import { ValidationServiceService } from './validation-service.service';

describe('ValidationServiceService', () => {
  let service: ValidationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
