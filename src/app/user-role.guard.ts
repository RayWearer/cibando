import { inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

export const userRoleGuard: CanActivateFn = (route, state) => {
  return JSON.parse(localStorage.getItem('user'))?.role ? true : inject(Router).navigateByUrl('/login');
};
