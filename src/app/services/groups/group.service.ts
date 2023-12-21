import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GroupApiBroker } from 'src/app/brokers/apis/group.api.broker';
import { GuidBroker } from 'src/app/brokers/guids/guid.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { Group } from 'src/app/models/groups/group.model';

@Injectable({ providedIn: 'root' })
export class GroupService {
  constructor(
    private apiBroker: GroupApiBroker,
    private localStorageBroker: LocalStorageBroker,
    private guidBroker: GuidBroker
  ) {}

  public post(group: Group): Observable<Group> {
    group.id = this.guidBroker.generateGuid();
    group.teamId = this.localStorageBroker.readUserCredential().TeamId;
    group.createdDate = new Date();
    group.updatedDate = new Date();
    group.isStaffRelated = false;
    group.isArchived = false;
    return this.apiBroker.postGroup(group);
  }

  public put(group: Group): Observable<Group> {
    group.updatedDate = new Date();
    return this.apiBroker.putGroup(group);
  }

  public getAll(): Observable<Group[]> {
    const teamId = this.localStorageBroker.readUserCredential().TeamId;

    return this.apiBroker.getGroups(teamId);
  }

  public getDepartments(): Observable<Group[]> {
    const teamId = this.localStorageBroker.readUserCredential().TeamId;

    return this.apiBroker
      .getGroups(teamId)
      .pipe(
        map((groups) => groups.filter((group) => group.isStaffRelated === true))
      );
  }

  public getGroups(): Observable<Group[]> {
    const teamId = this.localStorageBroker.readUserCredential().TeamId;

    return this.apiBroker
      .getGroups(teamId)
      .pipe(
        map((groups) =>
          groups.filter((group) => group.isStaffRelated === false)
        )
      );
  }

  // !!!TODO filter in backend
  public getActiveGroups(isStaffRelated: boolean = false): Observable<Group[]> {
    const teamId = this.localStorageBroker.readUserCredential().TeamId;

    return this.apiBroker
      .getGroups(teamId)
      .pipe(
        map((groups) =>
          groups.filter(
            (group) =>
              group.isStaffRelated === isStaffRelated &&
              group.isArchived === false
          )
        )
      );
  }
}
