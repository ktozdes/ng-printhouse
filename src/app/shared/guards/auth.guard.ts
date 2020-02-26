import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route,
  UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { authState } from 'src/app/store/app-state';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  authenticated: boolean;

  constructor(
    private store: Store <any>,  private router: Router) {
      const getState = this.store.select(authState);
      getState.subscribe((state) => {
        this.authenticated = state.authenticated;
      });
    }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      this.router.navigate(['/auth']);
      return this.authenticated;
  }
}
