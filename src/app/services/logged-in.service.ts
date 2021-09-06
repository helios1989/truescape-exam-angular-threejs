import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable()
export class LoggedinService {

    private authenticationStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isAuthenticated$: Observable<boolean> = this.authenticationStatus.asObservable();
  
    setLogin(newState: boolean) {
      // usually the token generated from api login service is localstorage
      this.authenticationStatus.next(newState);
    }

    setLogout() {
      // clear localstorage
      this.authenticationStatus.next(false);
    }

}