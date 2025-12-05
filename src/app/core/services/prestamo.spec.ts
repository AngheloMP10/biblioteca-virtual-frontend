import { TestBed } from '@angular/core/testing';

import { Prestamo } from './prestamo';

describe('Prestamo', () => {
  let service: Prestamo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Prestamo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
