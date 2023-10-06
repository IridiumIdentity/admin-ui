import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicContentViewItem } from '../dynamic-content-view-item';
import { TenantOverviewMetricService } from '../../../../services/tenant-overview-metric.service';
import * as echarts from 'echarts';
import { environment } from '../../../../../environments/environment';
import { AggregateUsersConfigService } from '../../../../services/aggregate-users-config.service';

@Component({
  selector: 'app-tenant-overview',
  templateUrl: './tenant-overview.component.html',
  styleUrls: ['./tenant-overview.component.css'],
})
export class TenantOverviewComponent implements DynamicContentViewItem, OnInit {
  readonly daysToSubtract = environment.tenantMetricDaysToGoBack;
  @Input() data: any;
  constructor(private overviewMetricService: TenantOverviewMetricService, private aggregateConfigService: AggregateUsersConfigService) {}

  ngOnInit(): void {
    let pieChart = echarts.init(document.getElementById('pie'), {
      width: 600,
      height: 400,
    });

    const subtractDays = (date: Date, days: number): Date => {
      const result = new Date(date);
      result.setDate(result.getDate() - days);
      return result;
    };

    const result = subtractDays(new Date(), this.daysToSubtract);

    this.overviewMetricService
      .getAccountTypeCount(this.data.tenantId, result)
      .subscribe(data => {
        pieChart.setOption(this.aggregateConfigService.get(data));
      });
  }

}
