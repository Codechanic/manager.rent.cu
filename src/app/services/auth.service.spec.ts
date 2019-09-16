import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CookieService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it(
    'should extract jwt from cookie when checking isAuthenticated and return false if not found',
    () => {
      const service: AuthService = TestBed.get(AuthService);
      const cookieService = TestBed.get(CookieService);
      jest.spyOn(cookieService, 'get').mockReturnValue(undefined);
      expect(service.isAuthenticated()).toBeFalsy();
      expect(cookieService.get).toBeCalled();
    }
  );

  it(
    'should extract jwt from cookie when checking isAuthenticated and return true if found',
    () => {
      const service: AuthService = TestBed.get(AuthService);
      const cookieService = TestBed.get(CookieService);
      jest.spyOn(cookieService, 'get').mockReturnValue('something here');
      expect(service.isAuthenticated()).toBeTruthy();
      expect(cookieService.get).toBeCalled();
    }
  );

  it('should make an http request on login', () => {
    const httpClient = TestBed.get(HttpClient);
    const service: AuthService = TestBed.get(AuthService);
    jest.spyOn(httpClient, 'post');
    service.login('someUsername', 'somePassword');
    expect(httpClient.post).toBeCalledWith(environment.uris.api + '/api/login', {
      username: 'someUsername',
      password: 'somePassword'
    });
  });

  it('should delete jwt cookie on logout and return an observable', () => {
    const service: AuthService = TestBed.get(AuthService);
    const cookieService = TestBed.get(CookieService);
    jest.spyOn(cookieService, 'delete');
    service.logout();
    expect(cookieService.delete).toBeCalledWith('context');
  });

  it('should make an http request on register', () => {
    const httpClient = TestBed.get(HttpClient);
    const service: AuthService = TestBed.get(AuthService);
    jest.spyOn(httpClient, 'post');
    service.register({});
    expect(httpClient.post).toBeCalledWith(environment.uris.api + '/api/register', {});
  });

  it('should return undefined if no valid token is found', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service.isTokenExpired()).toBeUndefined();
  });

  it('should return true if token is expired', () => {
    const service: AuthService = TestBed.get(AuthService);
    jest.spyOn(CryptoJS.AES, 'decrypt').mockReturnValue('somethingOtherThanUndefined');
    service.jwtDecoder = jest.fn().mockReturnValue({exp: 'somethingHere'});
    expect(service.isTokenExpired()).toBeTruthy();
  });

  it('should return true if token has no exp', () => {
    const service: AuthService = TestBed.get(AuthService);
    jest.spyOn(CryptoJS.AES, 'decrypt').mockReturnValue('somethingOtherThanUndefined');
    service.jwtDecoder = jest.fn().mockReturnValue({});
    expect(service.isTokenExpired()).toBeTruthy();
  });

  it('should return the current user on valid jwt', () => {
    const service: AuthService = TestBed.get(AuthService);
    jest.spyOn(CryptoJS.AES, 'decrypt').mockReturnValue('somethingOtherThanUndefined');
    const mockCurrentUser = {sub: 1, username: 'someUsername', managerId: 2};
    service.jwtDecoder = jest.fn().mockReturnValue(mockCurrentUser);
    expect(service.currentUser()).toEqual({
      id: mockCurrentUser.sub,
      username: mockCurrentUser.username,
      managerId: mockCurrentUser.managerId
    });
  });
});
