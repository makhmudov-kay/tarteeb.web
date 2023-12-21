import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { Contract } from 'src/app/models/contracts/contract.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ContractApiBroker extends ApiBroker<Contract> {
    relativeUrl = "api/Contracts";
    
    constructor(http: HttpClient) {
        super(http);
    }

    public postContract(contract: Contract): Observable<Contract> {
        return this.post(this.relativeUrl, contract);
    }

    public getContractByUserId(userId: string) : Observable<Contract>{
        const roleTeamFilter = `?$filter=UserId eq ${userId}&$expand=User($select=FirstName,LastName),ContractServiceOfferings($expand=ServiceOffering($select=BillingPrice,BillingUnit))`;
        
        return this.get(this.relativeUrl + roleTeamFilter);
    }   

    public deleteContract(contract: Contract): Observable<Contract> {
        return this.delete(this.relativeUrl, contract);
    }
}