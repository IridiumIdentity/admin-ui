import { TestBed } from '@angular/core/testing';

import { ClientSecretService } from './client-secret.service';

describe('ClientSecretService', () => {
  let service: ClientSecretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSecretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
