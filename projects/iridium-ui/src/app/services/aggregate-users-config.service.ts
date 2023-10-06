import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AggregateUsersConfigService {
  constructor() {}

  get(data: Map<String, String>) {
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        x: 'left',
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold',
            },
          },
          data: data,
        },
      ],
    };
  }
}
