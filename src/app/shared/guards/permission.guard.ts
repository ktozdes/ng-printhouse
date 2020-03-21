import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment,
  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { userState } from 'src/app/store/app-state';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate, CanActivateChild, CanLoad {
  permissions: Array<string>;
  constructor(private store: Store <any>,  private router: Router) {
    const getState = this.store.select(userState);
    getState.subscribe((state) => {
      this.permissions = state.permissions;
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (Array.isArray(this.permissions) && this.permissions.includes(next.data.permission)) {
      return true;
    }
    return false;
  }
  showMenuItem(menuPermission): boolean {
    if (Array.isArray(this.permissions)) {
      if (this.permissions.includes(menuPermission)) {
        return true;
      }
    }
    return false;

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (Array.isArray(this.permissions) && this.permissions.includes(route.data.permission)) {
        return true;
      }
      return false;
  }
}
