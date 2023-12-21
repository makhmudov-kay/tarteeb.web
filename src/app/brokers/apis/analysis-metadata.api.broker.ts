import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { AnalysisMetadata } from 'src/app/models/analysis-metadata/analysis-metada.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AnalysisMetadataApiBroker extends ApiBroker<AnalysisMetadata> {
    relativeUrl = 'api/AnalysisMetadatas';

    constructor(http: HttpClient) {
        super(http);
    }

    public getByTeamId(teamId: string): Observable<AnalysisMetadata[]>{
        const teamIdFilter = `?$filter=TeamId eq ${teamId}&$orderby=StartOfMonth desc`;

        return this.getAll(this.relativeUrl + teamIdFilter);
    }
}