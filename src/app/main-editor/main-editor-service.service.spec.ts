import { TestBed } from '@angular/core/testing';

import { MainEditorServiceService } from './main-editor-service.service';

describe('MainEditorServiceService', () => {
  let service: MainEditorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainEditorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
