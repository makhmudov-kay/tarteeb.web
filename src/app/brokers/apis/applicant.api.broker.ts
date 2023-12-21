import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { Applicant } from 'src/app/models/applicants/applicant.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApplicantApiBroker extends ApiBroker<Applicant>{
    relativeUrl = "api/Applicants";
    constructor(http: HttpClient) {
        super(http);
    }

    public postApplicant(applicant: Applicant){
        return this.post(this.relativeUrl, applicant);
    }
    
    public putApplicant(applicant: Applicant){
        return this.put(this.relativeUrl, applicant);
    }

    public getApplicantsByTeamId(teamId: string): Observable<Applicant[]>{
        let filter = `?$filter=teamId eq ${teamId} and status eq 'Pending'`;

        return this.http.get<Applicant[]>(`${this.baseUrl}/${this.relativeUrl}${filter}`);
    }
}