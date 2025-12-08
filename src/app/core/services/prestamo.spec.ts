import { TestBed } from '@angular/core/testing';

import { PrestamoService } from './prestamo';

describe('Prestamo', () => {
  let service: PrestamoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestamoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
