import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class TenantOverviewMetricService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  public getAccountTypeCount(tenantId: string, from: Date) {
    const token = this.cookieService.getCookie('iridium-token');
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    });
    const options = { headers: headers };
    return this.http
      .get<Map<String, String>>(
        environment.iridiumTrackerBaseUrl +
          `tenants/${tenantId}/account-type-metrics?from=${from.toISOString()}`,
        options
      )
      .pipe();
  }
}
