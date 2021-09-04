import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable()
export class LoggedinService {

    private authenticationStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isAuthenticated$: Observable<boolean> = this.authenticationStatus.asObservable();
  
    setLogin(newState: boolean) {
      this.authenticationStatus.next(newState);
    }

}