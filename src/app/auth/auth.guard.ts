import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.isLoggedIn())
    return true;

  authService.setRedirectUrl(state.url);
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};
