import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceOfferingApiBroker } from 'src/app/brokers/apis/service-offering.api.broker';
import { GuidBroker } from 'src/app/brokers/guids/guid.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { ServiceOffering } from 'src/app/models/service-offerings/service-offering.model';

@Injectable({providedIn: 'root'})
export class ServiceOfferingService {
    constructor(
        private guidBroker: GuidBroker,
        private localStorageBroker: LocalStorageBroker,
        private serviceOfferingApiBroker: ServiceOfferingApiBroker) 
    { }
    
    public postServiceOffering(serviceOffering: ServiceOffering): Observable<ServiceOffering> {
        serviceOffering.teamId = this.localStorageBroker.readUserCredential().TeamId.toString();
        serviceOffering.id = this.guidBroker.generateGuid();

        return this.serviceOfferingApiBroker.postServiceOffering(serviceOffering);
    }

    public getServiceOfferings(): Observable<ServiceOffering[]> {
        const teamId = this.localStorageBroker.readUserCredential().TeamId;

        return this.serviceOfferingApiBroker.getServiceOfferings(teamId);
    }

    public putServiceOffering(serviceOffering: ServiceOffering): Observable<ServiceOffering> {
        return this.serviceOfferingApiBroker.putServiceOffering(serviceOffering);
    }

    public deleteServiceOffering(serviceOffering: ServiceOffering): Observable<ServiceOffering> {
        return this.serviceOfferingApiBroker.deleteServiceOffering(serviceOffering);
    }
}