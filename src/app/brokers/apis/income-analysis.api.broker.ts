import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { IncomeAnalysis } from 'src/app/models/income-analysis/income-analysis.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalysisMetadata } from 'src/app/models/analysis-metadata/analysis-metada.model';
import { LocalStorageBroker } from '../local-storages/local-storage.broker';

@Injectable({ providedIn: 'root' })
export class IncomeAnalysisApiBroker extends ApiBroker<IncomeAnalysis> {
  relativeUrl = 'api/IncomeAnalysises';

  constructor(
    http: HttpClient,
    private localStorageBroker: LocalStorageBroker
  ) {
    super(http);
  }

  public getByIds(
    analysisMetadata: AnalysisMetadata
  ): Observable<IncomeAnalysis> {
    const teamId = this.localStorageBroker.readUserCredential().TeamId;
    const validStart = new Date(analysisMetadata.startOfMonth).toISOString();
    const validEnd = new Date(analysisMetadata.endOfMonth).toISOString();
    const ids = `?teamId=${teamId}&start=${validStart}&end=${validEnd}`;

    return this.http.get<IncomeAnalysis>(
      `${this.baseUrl}/${this.relativeUrl}/${ids}`
    );
  }

  public putAnalysis(teamId: string){
    const url = 'api/TeamAnalysises'
    return this.http.put(`${this.baseUrl}/${url}?teamId=${teamId}`, null);
  }
}
