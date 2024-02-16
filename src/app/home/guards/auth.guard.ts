import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.getToken();
  if (!authService.logged()) {
    router.navigateByUrl('/auth');
  }
  return authService.logged();
};
