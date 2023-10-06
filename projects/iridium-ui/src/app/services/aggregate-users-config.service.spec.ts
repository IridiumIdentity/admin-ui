import { TestBed } from '@angular/core/testing';

import { AggregateUsersConfigService } from './aggregate-users-config.service';

describe('AggregateUsersConfigGeneratorService', () => {
  let service: AggregateUsersConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AggregateUsersConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
