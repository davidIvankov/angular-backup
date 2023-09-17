import { inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | Promise<boolean> | Observable<boolean | UrlTree> => {
  const router = inject(Router);
  return inject(AuthService).user.pipe(
    take(1),
    map((user) => {
      if (!!user) return true;
      else return router.createUrlTree(['/auth']);
    })
  );
};
