import { Injectable } from '@angular/core';
import { LocalStorageBroker } from '../../brokers/local-storages/local-storage.broker';
import { ApiBroker } from '../../brokers/apis/api.broker';
import { GuidBroker } from '../../brokers/guids/guid.broker';
import { Client } from '../../models/clients/client.model';
import { Role } from '../../models/user-credentials/role.model';
import { Observable } from 'rxjs';
import { ClientApiBroker } from 'src/app/brokers/apis/client.api.broker';
import { ClientFilterModel } from 'src/app/models/clients/client-filter.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(
    private apiBroker: ClientApiBroker,
    private localStorageBroker: LocalStorageBroker,
    private guidBroker: GuidBroker
  ) {}

  public getAllByGroupId(groupId: string): Observable<Client[]> {
    return this.apiBroker.getClientsByGroupId(groupId);
  }

  getAll(): Observable<Client[]> {
    const teamId = this.localStorageBroker.readUserCredential().TeamId;

    return this.apiBroker.getClients(teamId);
  }

  putClient(client: Client): Observable<Client> {
    return this.apiBroker.putClient(client);
  }

  getFilteredClients(filter: ClientFilterModel): Observable<Client[]> {
    const teamId = this.localStorageBroker.readUserCredential().TeamId;

    return this.apiBroker.getFilteredClients(filter, teamId);
  }

  post(client: Client): Observable<Client> {
    client.id = this.guidBroker.generateGuid();
    client.role = Role.Client;
    client.isActive = true;
    client.isVerified = true;
    client.password = 'Hello11!'; //TODO: Update this based on business logic
    client.teamId = this.localStorageBroker.readUserCredential().TeamId;
    client.createdDate = new Date();
    client.birthDate = new Date();
    client.updatedDate = new Date();
    client.email =
      client.firstName.split(' ').join('') +
      '.' +
      client.lastName.split(' ').join('') +
      '@tarteeb.uz';

    return this.apiBroker.postClient(client);
  }
}
