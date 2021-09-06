import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoggedinService } from './services/logged-in.service';

@Injectable()
export class AuthGuards implements CanActivate {

  constructor(private readonly loggedInService: LoggedinService, private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.loggedInService.isAuthenticated$.subscribe((d: boolean) => {
      if (!d) {
        this.router.navigate(['/']);
      }
    })
    return this.loggedInService.isAuthenticated$;
  }
}
