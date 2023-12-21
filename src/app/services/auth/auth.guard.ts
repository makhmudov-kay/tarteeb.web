import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';

@Injectable({ providedIn: 'root' })
export class AuthGuardService {
  constructor(
    private localStorageBroker: LocalStorageBroker,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      !this.localStorageBroker.isLoggedIn() ||
      this.localStorageBroker.isTokenExpired()
    ) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
