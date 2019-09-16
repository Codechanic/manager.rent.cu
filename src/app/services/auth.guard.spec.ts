import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useValue: {navigate: jest.fn()}
        },
        {
          provide: ActivatedRouteSnapshot,
          useValue: {}
        },
        {
          provide: RouterStateSnapshot,
          useValue: {}
        },
        CookieService
      ],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should check if the user is authenticated', inject([AuthGuard], (guard: AuthGuard) => {
      const authService = TestBed.get(AuthService);
      jest.spyOn(authService, 'isAuthenticated');
      guard.canLoad({}, []);
      expect(authService.isAuthenticated).toBeCalled();
    })
  );

  it(
    'should check if the token expired if the user is in fact authenticated',
    inject([AuthGuard], (guard: AuthGuard) => {
      const authService = TestBed.get(AuthService);
      jest.spyOn(authService, 'isAuthenticated').mockReturnValue(true);
      jest.spyOn(authService, 'isTokenExpired');
      guard.canLoad({}, []);
      expect(authService.isAuthenticated).toBeCalled();
      expect(authService.isTokenExpired).toBeCalled();
    })
  );

  it(
    'should navigate to login page iuf user is authenticated but token expired',
    inject([AuthGuard], (guard: AuthGuard) => {
      const authService = TestBed.get(AuthService);
      const router = TestBed.get(Router);
      jest.spyOn(authService, 'isAuthenticated').mockReturnValue(true);
      jest.spyOn(authService, 'isTokenExpired').mockReturnValue(true);
      jest.spyOn(router, 'navigate');
      guard.canLoad({}, []);
      expect(router.navigate).toBeCalledWith(['/login/true']);
    })
  );

  it(
    'should check if the user is authenticated on canActivate',
    inject(
      [AuthGuard, ActivatedRouteSnapshot, RouterStateSnapshot],
      (guard: AuthGuard, activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
        const authService = TestBed.get(AuthService);
        jest.spyOn(authService, 'isAuthenticated');
        guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        expect(authService.isAuthenticated).toBeCalled();
      })
  );

  it(
    'should check if the token expired if the user is in fact authenticated on canActivate',
    inject(
      [AuthGuard, ActivatedRouteSnapshot, RouterStateSnapshot],
      (guard: AuthGuard, activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
        const authService = TestBed.get(AuthService);
        jest.spyOn(authService, 'isAuthenticated').mockReturnValue(true);
        jest.spyOn(authService, 'isTokenExpired');
        guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        expect(authService.isAuthenticated).toBeCalled();
        expect(authService.isTokenExpired).toBeCalled();
      })
  );

  it(
    'should navigate to login page iuf user is authenticated but token expired on canActivate',
    inject(
      [AuthGuard, ActivatedRouteSnapshot, RouterStateSnapshot],
      (guard: AuthGuard, activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
        const authService = TestBed.get(AuthService);
        const router = TestBed.get(Router);
        jest.spyOn(authService, 'isAuthenticated').mockReturnValue(true);
        jest.spyOn(authService, 'isTokenExpired').mockReturnValue(true);
        jest.spyOn(router, 'navigate');
        guard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
        expect(router.navigate).toBeCalledWith(['/login/true']);
      })
  );
});
