import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/app/models/clients/client.model';
import { ClientFilterModel } from 'src/app/models/clients/client-filter.model';

@Injectable({ providedIn: 'root' })
export class ClientApiBroker extends ApiBroker<Client> {
  relativeUrl = 'api/UserProfiles';

  constructor(http: HttpClient) {
    super(http);
  }

  public postClient(client: Client): Observable<Client> {
    const relativeUrl = 'api/Accounts/';
    const action = 'SignUp';

    return this.post(relativeUrl + action, client);
  }

  public putClient(client: Client): Observable<Client> {
    return this.put(this.relativeUrl, client);
  }

  public getClientsByGroupId(groupId: string): Observable<Client[]> {
    const roleGroupFilter = `?$filter=Role eq Tarteeb.Api.Models.Foundations.Users.Role'Client' and GroupId eq ${groupId}`;

    return this.getAll(this.relativeUrl + roleGroupFilter);
  }

  public getClients(teamId: string): Observable<Client[]> {
    const roleTeamFilter = `?$filter=Role eq Tarteeb.Api.Models.Foundations.Users.Role'Client' and TeamId eq ${teamId}`;

    return this.getAll(this.relativeUrl + roleTeamFilter);
  }

  public getFilteredClients(
    filter: ClientFilterModel,
    teamId: string
  ): Observable<Client[]> {
    let roleTeamFilter = `?$filter=Role eq Tarteeb.Api.Models.Foundations.Users.Role'Client' and TeamId eq ${teamId} and IsVerified eq true`;

    if (filter.groupId) {
      roleTeamFilter += ` and GroupId eq ${filter.groupId}`;
    }

    if (filter.firstName) {
      roleTeamFilter += ` and startswith(Firstname, '${filter.firstName}') or startswith(Lastname, '${filter.firstName}')`;
    }

    if (typeof filter.isActive === 'boolean') {
      roleTeamFilter += ` and IsActive eq ${filter.isActive}`;
    }

    //finally add expand to get the group
    roleTeamFilter.concat('&$expand=Group($select=Id,Name)');

    return this.getAll(this.relativeUrl + roleTeamFilter);
  }
}
