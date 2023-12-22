import { inject } from '@angular/core';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
export const AuthGuard = async () => {
  const router = inject(Router);
  const authService = inject(AccountService);
  let isLoggedIn = authService.getIsLoggedIn();
  if (isLoggedIn) {
    return true;
  } else {
    router.navigateByUrl('/dashboard/company');
    return false;
  }
};
