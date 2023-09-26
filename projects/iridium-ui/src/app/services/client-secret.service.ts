import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationUpdateRequest } from '../components/dashboard/domain/application-update-request';
import { ApplicationUpdateResponse } from '../components/dashboard/domain/application-update-response';
import { environment } from '../../environments/environment';
import { CookieService } from './cookie.service';
import { CreateApplicationSecretResponse } from './domain/create-application-secret-response';

@Injectable({
  providedIn: 'root',
})
export class ClientSecretService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  create(tenantId: string, applicationId: string) {
    console.log('create client secret');
    const token = this.cookieService.getCookie('iridium-token');
    const headers = new HttpHeaders({
      Accept:
        'application/vnd.iridium.id.authz.client-secret-create-response.1+json',
      Authorization: 'Bearer ' + token,
    });
    const options = { headers: headers };

    return this.http.post<CreateApplicationSecretResponse>(
      environment.iridium.domain +
        `tenants/${tenantId}/applications/${applicationId}/client-secrets`,
      null,
      options
    );
  }
}
