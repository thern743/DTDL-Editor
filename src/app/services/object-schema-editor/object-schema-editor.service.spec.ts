import { TestBed } from '@angular/core/testing';

import { ObjectSchemaEditorService } from './object-schema-editor.service';

describe('ObjectSchemaEditorServiceService', () => {
  let service: ObjectSchemaEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectSchemaEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
