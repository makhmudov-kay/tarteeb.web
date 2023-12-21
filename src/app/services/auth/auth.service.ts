import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiBroker } from 'src/app/brokers/apis/auth.api.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { NgDestroy } from '../destroy/ng-destroy.service';
import { takeUntil } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private authApiBroker: AuthApiBroker,
    private localStorageBroker: LocalStorageBroker,
    private router: Router,
    private $destroy: NgDestroy
  ) {}

  login(email: string, password: string) {
    return this.authApiBroker
      .login(email, password)
      .pipe(takeUntil(this.$destroy));
  }

  /**
   *
   */
  logout() {
    this.localStorageBroker.logout();
  }
}
