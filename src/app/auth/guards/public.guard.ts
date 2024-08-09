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

import { map, Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuthentication().pipe(
    tap((auth) => console.log({ isAuth: auth })),
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['./']);
      }
    }),
    map((isAuthenticated) => !isAuthenticated)
  );
};

export const canActivatePublicGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  console.log({ route, state });
  return checkAuthStatus();
};

export const canMatchPublicGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): Observable<boolean> => {
  console.log({ route, segments });
  return checkAuthStatus();
};
