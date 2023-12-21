import { Injectable } from '@angular/core';
import { GroupAnalysis } from 'src/app/models/group-analysis/group-analysis.model';
import { ApiBroker } from './api.broker';
import { HttpClient } from '@angular/common/http';
import { AnalysisMetadata } from 'src/app/models/analysis-metadata/analysis-metada.model';
import { Observable } from 'rxjs';
import { LocalStorageBroker } from '../local-storages/local-storage.broker';

@Injectable({ providedIn: 'root' })
export class GroupAnalysisApiBroker extends ApiBroker<GroupAnalysis> {
  relativeUrl = 'api/GroupAnalysises';

  constructor(
    private localStorageBroker: LocalStorageBroker,
    http: HttpClient
  ) {
    super(http);
  }

  public getByIds(
    analysisMetadata: AnalysisMetadata & { firstName: string }
  ): Observable<GroupAnalysis[]> {
    const validStart = new Date(analysisMetadata.startOfMonth).toISOString();
    const validEnd = new Date(analysisMetadata.endOfMonth).toISOString();
    const teamId = this.localStorageBroker.readUserCredential().TeamId;
    let ids = `?teamId=${teamId}&start=${validStart}&end=${validEnd}&expand=Group`;

    if (analysisMetadata.firstName) {
      ids += ` &filter=startswith(Group/Name, '${analysisMetadata.firstName}')`;
    }

    return this.http.get<GroupAnalysis[]>(
      `${this.baseUrl}/${this.relativeUrl}/${ids}`
    );
  }
}
