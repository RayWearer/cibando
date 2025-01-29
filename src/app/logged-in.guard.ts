/*
import { CanActivateFn } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  return true;
};
*/

import { inject } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isLogged() ? true : inject(Router).createUrlTree(['/login']);
};
