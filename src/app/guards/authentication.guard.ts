import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AsyncSubject, Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authorizationService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authenticationSubject = new AsyncSubject<boolean>();
    this.authorizationService.checkToken().subscribe(
      success => {
        authenticationSubject.next(true);
        authenticationSubject.complete();
      },
      error => {
        authenticationSubject.next(false);
        authenticationSubject.complete();
      }
    );

    return authenticationSubject;
  }

}
