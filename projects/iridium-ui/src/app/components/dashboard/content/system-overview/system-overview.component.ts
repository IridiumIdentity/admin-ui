import { Component, Input, OnInit } from '@angular/core';
import { DynamicContentViewItem } from '../dynamic-content-view-item';
import * as echarts from 'echarts';
import { TenantOverviewMetricService } from '../../../../services/tenant-overview-metric.service';

@Component({
  selector: 'app-system-overview',
  templateUrl: './system-overview.component.html',
  styleUrls: ['./system-overview.component.css'],
})
export class SystemOverviewComponent implements DynamicContentViewItem {
  @Input() data: any;
}
