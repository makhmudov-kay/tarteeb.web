import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicantApiBroker } from 'src/app/brokers/apis/applicant.api.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { Applicant } from 'src/app/models/applicants/applicant.model';

@Injectable({providedIn: 'root'})
export class ApplicantService {

    constructor(
        private localStorageBroker: LocalStorageBroker,
        private applicantApiBroker: ApplicantApiBroker
    ) { }
    
    // post
    public postApplicant(applicant: Applicant): Observable<Applicant> {
        return this.applicantApiBroker.postApplicant(applicant);
    }

    //put 
    public putApplicant(applicant: Applicant): Observable<Applicant> {
        return this.applicantApiBroker.putApplicant(applicant);
    }

    // get
    public getAllApplicants(): Observable<Applicant[]> {
        const teamId = this.localStorageBroker.readUserCredential().TeamId;

        return this.applicantApiBroker.getApplicantsByTeamId(teamId);
    }
}