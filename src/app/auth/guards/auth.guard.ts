import { inject } from '@angular/core';
import {
  CanMatchFn,
  Route,
  UrlSegment,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['./auth/login']);
      }
    })
  );
};

export const canActivateAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  console.log({ route, state });
  return checkAuthStatus();
};

export const canMatchAuthGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): Observable<boolean> => {
  console.log({ route, segments });
  return checkAuthStatus();
};
