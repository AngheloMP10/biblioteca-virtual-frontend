import { TestBed } from '@angular/core/testing';

import { Libro } from './libro';

describe('Libro', () => {
  let service: Libro;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Libro);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
