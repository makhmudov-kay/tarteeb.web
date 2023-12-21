import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamsApiBroker extends ApiBroker<any> {
  relativeUrl = 'api/Teams';

  constructor(http: HttpClient) {
    super(http);
  }

  public getTeams(teamId: string): Observable<any> {
    return this.getAll(teamId);
  }
}
