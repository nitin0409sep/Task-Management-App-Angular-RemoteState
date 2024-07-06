import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { inject } from "@angular/core";
import { map } from "rxjs";


export const canActivateCore: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const { url } = state;
    return guard(url);
};


export const canActivateCoreChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const { url } = state;
    return guard(url);
  };

const guard = (url: string) => {
    const router = inject(Router);
    return inject(AuthService).isLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          router.navigate(['/auth'], {
            queryParams: {},
          });
        }
        return isLoggedIn;
      }),
    );
  };