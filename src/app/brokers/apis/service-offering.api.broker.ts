import { Injectable } from '@angular/core';
import { ServiceOffering } from 'src/app/models/service-offerings/service-offering.model';
import { ApiBroker } from './api.broker';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ServiceOfferingApiBroker extends ApiBroker<ServiceOffering> {
    relativeUrl = "api/ServiceOfferings";

    constructor(http: HttpClient) {
        super(http);
    }

    public postServiceOffering(serviceOffering: ServiceOffering): Observable<ServiceOffering> {
        return this.post(this.relativeUrl, serviceOffering);
    }

    public getServiceOfferings(teamId: string): Observable<ServiceOffering[]> {
        const roleTeamFilter = `?$filter= TeamId eq ${teamId}`;
        
        return this.getAll(this.relativeUrl + roleTeamFilter);
    }

    public putServiceOffering(serviceOffering: ServiceOffering): Observable<ServiceOffering> {
        return this.put(this.relativeUrl, serviceOffering);
    }

    public deleteServiceOffering(serviceOffering: ServiceOffering): Observable<ServiceOffering> {
        return this.delete(this.relativeUrl, serviceOffering);
    }
}