import { TestBed } from '@angular/core/testing';

import { LoginDescriptorService } from './login-descriptor.service';

describe('LoginDescriptorService', () => {
  let service: LoginDescriptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginDescriptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
