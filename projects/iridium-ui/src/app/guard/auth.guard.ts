import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { NgxIridiumClientService } from '@iridiumidentity/ngx-iridium-client';

export const authGuard = async () => {
  const router = inject(Router);
  const authService = inject(NgxIridiumClientService);
  console.log('in auth guard');
  // @ts-ignore
  authService.isAuthenticated().subscribe({
    next: (value: any) => {
      console.log('next', value);
      return true;
    },
    error: (error: any) => {
      console.error('error', error);
      router.navigateByUrl('/');
    },
  });
};
