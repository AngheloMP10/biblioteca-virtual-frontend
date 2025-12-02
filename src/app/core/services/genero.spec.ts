import { TestBed } from '@angular/core/testing';

import { Genero } from './genero';

describe('Genero', () => {
  let service: Genero;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Genero);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
