import { TestBed } from '@angular/core/testing';

import { TokenStorage } from './token-storage';

describe('TokenStorage', () => {
  let service: TokenStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
