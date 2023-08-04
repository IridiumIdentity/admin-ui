import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TenantCreateResponse } from './domain/tenant-create-response';
import { environment } from '../../environments/environment';
import { TenantLogoUpdateRequest } from './domain/tenant-logo-update-request';
import { CookieService } from './cookie.service';
import { ApplicationResponse } from './domain/application-response';
import { LoginDescriptorResponse } from './domain/login-descriptor-response';

@Injectable({
  providedIn: 'root'
})
export class LoginDescriptorService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  updateTenantLogo(formGroup: FormGroup, tenantId: string) {
    console.log('update ' + tenantId + 'with ' + formGroup.controls['tenantLogoUrl'].value)
    const request = new TenantLogoUpdateRequest();
    request.logoUrl = formGroup.controls['tenantLogoUrl'].value;
    const token = this.cookieService.getCookie('iridium-token')
    const headers = new HttpHeaders({
      Accept:  'application/vnd.iridium.id.tenant-logo-update-response.1+json',
      'Content-Type': 'application/vnd.iridium.id.tenant-logo-update-request.1+json',
      'Authorization': 'Bearer ' + token
    })
    const options = { headers: headers }
    return this.http.put<TenantCreateResponse>(environment.iridium.domain + `tenants/${tenantId}/login-descriptors`, request, options).pipe()
  }

  get(tenantId: string) {
    const token = this.cookieService.getCookie('iridium-token')
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.iridium.id.login-descriptor-response.1+json',
      'Authorization': 'Bearer ' + token
    })
    const options = { headers: headers }
    return this.http.get<LoginDescriptorResponse>(environment.iridium.domain + `tenants/${tenantId}/login-descriptors`, options)
  }
}
