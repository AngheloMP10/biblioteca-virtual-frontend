import { TestBed } from '@angular/core/testing';

import { Autor } from './autor';

describe('Autor', () => {
  let service: Autor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Autor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
