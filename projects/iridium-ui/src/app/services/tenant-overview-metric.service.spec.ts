import { TestBed } from '@angular/core/testing';

import { TenantOverviewMetricService } from './tenant-overview-metric.service';

describe('TenantOverviewMetricService', () => {
  let service: TenantOverviewMetricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantOverviewMetricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
