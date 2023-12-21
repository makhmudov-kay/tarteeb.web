import { Injectable } from '@angular/core';
import { LocalStorageBroker } from '../../brokers/local-storages/local-storage.broker';
import { ApiBroker } from '../../brokers/apis/api.broker';
import { GuidBroker } from '../../brokers/guids/guid.broker';
import { Contractor } from 'src/app/models/contractors/contractor.model';
import { Role } from '../../models/user-credentials/role.model';
import { Observable } from 'rxjs';
import { ContractorApiBroker } from 'src/app/brokers/apis/contractor.api.broker';
import { ContractorFilterModel } from 'src/app/models/contractors/contractor-filter.model';

@Injectable({ providedIn: 'root' })
export class ContractorService {
  constructor(
    private apiBroker: ContractorApiBroker,
    private localStorageBroker: LocalStorageBroker,
    private guidBroker: GuidBroker
  ) {}

  create(contractor: Contractor): Observable<Contractor> {
    contractor.id = this.guidBroker.generateGuid();
    contractor.role = Role.Contractor;
    contractor.isActive = true;
    contractor.isVerified = true;
    contractor.teamId = this.localStorageBroker.readUserCredential().TeamId;
    contractor.createdDate = new Date();
    contractor.updatedDate = new Date();

    return this.apiBroker.postContractor(contractor);
  }

  edit(contractor: Contractor): Observable<Contractor> {
    return this.apiBroker.putСontractor(contractor);
  }

  getAll(filter?: ContractorFilterModel): Observable<Contractor[]> {
    const teamId = this.localStorageBroker.readUserCredential().TeamId;
    return this.apiBroker.getContractors(teamId, filter);
  }
}
