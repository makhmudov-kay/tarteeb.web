import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupAnalysisApiBroker } from 'src/app/brokers/apis/group-analysis.api.broker';
import { AnalysisMetadata } from 'src/app/models/analysis-metadata/analysis-metada.model';
import { GroupAnalysis } from 'src/app/models/group-analysis/group-analysis.model';

@Injectable({ providedIn: 'root' })
export class GroupAnalysisService {
  constructor(private groupAnalysisApiBroker: GroupAnalysisApiBroker) {}

  public getByIds(
    analysisMetadata: AnalysisMetadata & { firstName: string }
  ): Observable<GroupAnalysis[]> {
    return this.groupAnalysisApiBroker.getByIds(analysisMetadata);
  }
}
