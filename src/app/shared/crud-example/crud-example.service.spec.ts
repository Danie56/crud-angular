import { TestBed } from '@angular/core/testing';

import { CrudExampleService } from './crud-example.service';

describe('CrudExampleService', () => {
  let service: CrudExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
