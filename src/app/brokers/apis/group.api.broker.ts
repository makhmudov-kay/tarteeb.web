import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { Group } from 'src/app/models/groups/group.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GroupApiBroker extends ApiBroker<Group> {
  relativeUrl = 'api/Groups';

  constructor(http: HttpClient) {
    super(http);
  }

  public postGroup(group: Group): Observable<Group> {
    return this.post(this.relativeUrl, group);
  }

  public getGroups(teamId: string): Observable<Group[]> {
    const roleTeamFilter = `?$filter= TeamId eq ${teamId}`;

    return this.getAll(this.relativeUrl + roleTeamFilter);
  }

  public putGroup(group: Group): Observable<Group> {
    return this.put(this.relativeUrl, group);
  }
}
