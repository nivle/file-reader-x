import { TestBed } from '@angular/core/testing';

import { FileReaderXService } from './file-reader-x.service';

describe('FileReaderXService', () => {
  let service: FileReaderXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileReaderXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
