import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractApiBroker } from 'src/app/brokers/apis/contract.api.broker';
import { GuidBroker } from 'src/app/brokers/guids/guid.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { Contract } from 'src/app/models/contracts/contract.model';
import { PayFrequency } from 'src/app/models/contracts/payFrequency.model';

@Injectable({ providedIn: 'root' })
export class ContractService {
  constructor(
    private contractApiBroker: ContractApiBroker,
    private guidBroker: GuidBroker,
    private localStorageBroker: LocalStorageBroker
  ) {}

  public postContract(contract: Contract): Observable<Contract> {
    return this.contractApiBroker.postContract(contract);
  }

  public getContractByUserId(userId: string): Observable<Contract> {
    return this.contractApiBroker.getContractByUserId(userId);
  }

  public deleteContract(contract: Contract): Observable<Contract> {
    return this.contractApiBroker.deleteContract(contract);
  }

  /**
   *
   * @param studentId
   * @param courseId
   * @returns
   */
  createContract(studentId: string, courseId: string): Observable<Contract> {
    let newId = this.guidBroker.generateGuid();
    const contract = {
      Id: newId.toString(),
      TimeCollectionType: 0,
      PayDistributionType: 0,
      Frequency: PayFrequency.Monthly,
      IsBillable: false,
      UserId: studentId,
      ContractServiceOfferings: [
        {
          Id: this.guidBroker.generateGuid().toString(),
          ContractId: newId.toString(),
          ServiceOfferingId: courseId,
        },
      ],
      CreatedDate: new Date().toISOString(),
      UpdatedDate: new Date().toISOString(),
      CreatedUserId: this.localStorageBroker.readUserCredential().Id,
      UpdatedUserId: this.localStorageBroker.readUserCredential().Id,
    };

    return this.postContract(contract);
  }
}
