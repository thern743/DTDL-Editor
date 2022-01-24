import { TestBed } from '@angular/core/testing';

import { ObjectSchemaService } from './object-schema.service';

describe('ObjectSchemaEditorServiceService', () => {
  let service: ObjectSchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectSchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
