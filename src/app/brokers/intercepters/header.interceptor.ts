import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageBroker } from '../local-storages/local-storage.broker';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private token$: LocalStorageBroker) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.token$.getToken();
    let headers;
    if (token) {
      headers = req.headers.set('Authorization', `Bearer ${token}`);
    }
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
