import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AnalysisMetadataApiBroker } from 'src/app/brokers/apis/analysis-metadata.api.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { AnalysisMetadata } from 'src/app/models/analysis-metadata/analysis-metada.model';

@Injectable({ providedIn: 'root' })
export class AnalysisMetadataService {
  constructor(
    private localStorageBroker: LocalStorageBroker,
    private analysisMetadataApiBroker: AnalysisMetadataApiBroker,
    private datePipe: DatePipe
  ) {}

  public getAll() {
    const teamId = this.localStorageBroker.readUserCredential().TeamId;
    return this.analysisMetadataApiBroker.getByTeamId(teamId).pipe(
      map((result) => {
        return result.map((el) => {
          const startMonth = this.datePipe.transform(
            el.startOfMonth,
            'dd-MMMM'
          );
          const endMonth = this.datePipe.transform(el.endOfMonth, 'dd-MMMM');
          return {
            value:
              new Date(el.startOfMonth).toISOString() +
              '&&' +
              new Date(el.endOfMonth).toISOString(),
            label: startMonth + '-' + endMonth,
          };
        });
      })
    );
  }

  public getByTeamId(): Observable<AnalysisMetadata[]> {
    const teamId = this.localStorageBroker.readUserCredential().TeamId;
    return this.analysisMetadataApiBroker.getByTeamId(teamId);
  }
}
