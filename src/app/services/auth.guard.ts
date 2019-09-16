import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

/**
 * Authentication guard for the entire application
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {

  /**
   * Constructor
   * @param router The Angular Router service to be able to redirect
   * @param authService The AuthService to be able to check if the useris authenticated
   */
  constructor(private router: Router, private authService: AuthService) {
  }

  /**
   * Implementation for the canLoad guard hook
   * @param route Called route
   * @param segments Route segments
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    /* if the user is authenticated but the token expired*/
    if (this.authService.isAuthenticated()) {
      if (this.authService.isTokenExpired()) {

        /*redirect to login page*/
        this.router.navigate(['/login/true']);
        return false;
      }
      return true;
    }

    /*if the user is not authenticated*/
    else {
      /*redirect to login page*/
      this.router.navigate(['/login']);
      return false;
    }
  }

  /**
   * Implementation for the canActivate guard hook
   * @description The implementation is similar to that of the canLoad hook
   * @param route Called route
   * @param state Route state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      if (this.authService.isTokenExpired()) {
        this.router.navigate(['/login/true']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
