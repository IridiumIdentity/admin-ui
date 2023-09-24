import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from './cookie.service';
import { ExternalProviderTemplateSummaryResponse } from './domain/external-provider-template-summary-response';

@Injectable({
  providedIn: 'root',
})
export class ExternalProviderTemplateService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  getSummaries() {
    const token = this.cookieService.getCookie('iridium-token');
    const headers = new HttpHeaders({
      Accept:
        'application/vnd.iridium.id.external-provider-template-summary-list.1+json',
      Authorization: 'Bearer ' + token,
    });
    const options = { headers: headers };
    return this.http.get<ExternalProviderTemplateSummaryResponse[]>(
      environment.iridium.domain + 'external-provider-templates',
      options
    );
  }

  getAvailableTemplateSummaries(tenantId: string) {
    const token = this.cookieService.getCookie('iridium-token');
    const headers = new HttpHeaders({
      Accept:
        'application/vnd.iridium.id.external-provider-template-summary-list.1+json',
      Authorization: 'Bearer ' + token,
    });
    const options = { headers: headers };
    return this.http.get<ExternalProviderTemplateSummaryResponse[]>(
      environment.iridium.domain +
        `tenants/${tenantId}/external-provider-templates`,
      options
    );
  }
}
