import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationTypeSummary } from '../components/dashboard/domain/application-type-summary';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  getCurrentUserToken(): string {
    return this.cookieService.getCookie('iridium-token');
  }

  logout() {
    const token = this.cookieService.getCookie('iridium-token');
    const headers = new HttpHeaders({
      Accept: 'application/vnd.iridium.id.application-type-summary-list.1+json',
      Authorization: 'Bearer ' + token,
    });
    const options = { headers: headers };
    return this.http.delete(
      environment.iridium.domain +
        `applications/${environment.iridium.clientId}/tokens`,
      options
    );
  }
}
