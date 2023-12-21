import { Injectable } from '@angular/core';
import { Contractor } from 'src/app/models/contractors/contractor.model';
import { ApiBroker } from './api.broker';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContractorFilterModel } from 'src/app/models/contractors/contractor-filter.model';

@Injectable({ providedIn: 'root' })
export class ContractorApiBroker extends ApiBroker<Contractor> {
  constructor(http: HttpClient) {
    super(http);
  }

  public postContractor(contractor: Contractor): Observable<Contractor> {
    const relativeUrl = 'api/Accounts/';
    const action = 'SignUp';

    return this.post(relativeUrl + action, contractor);
  }

  public putСontractor(contractor: Contractor): Observable<Contractor> {
    const relativeUrl = 'api/UserProfiles';
    return this.put(relativeUrl, contractor);
  }

  public getContractors(
    teamId: string,
    filter?: ContractorFilterModel
  ): Observable<Contractor[]> {
    const relativeUrl = 'api/UserProfiles';
    let roleTeamFilter = `?$filter=Role eq Tarteeb.Api.Models.Foundations.Users.Role'Contractor' and TeamId eq ${teamId}`;

    if (filter?.firstName) {
      roleTeamFilter += ` and startswith(Firstname, '${filter.firstName}') or startswith(Lastname, '${filter.firstName}')`;
    }

    if (filter?.departmentId) {
      roleTeamFilter += ` and GroupId eq ${filter.departmentId}`;
    }

    if (typeof filter?.isActive === 'boolean') {
      roleTeamFilter += ` and IsActive eq ${filter.isActive}`;
    }

    return this.getAll(relativeUrl + roleTeamFilter);
  }
}
