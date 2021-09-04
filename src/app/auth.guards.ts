import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { LoggedinService } from './services/logged-in.service';

@Injectable()
export class AuthGuards implements CanActivate {

  constructor(private readonly loggedInService: LoggedinService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.loggedInService.isAuthenticated$;
  }
}
