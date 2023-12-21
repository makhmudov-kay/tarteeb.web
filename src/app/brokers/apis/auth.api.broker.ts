import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiBroker extends ApiBroker<string> {
  constructor(http: HttpClient) {
    super(http);
  }

  public login(email: string, password: string): Observable<string> {
    const relativeUrl = 'api/Accounts/Login';
    const query = `?email=${email}&password=${password}`;

    return this.get(relativeUrl + query);
  }
}
