import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncomeAnalysisApiBroker } from 'src/app/brokers/apis/income-analysis.api.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { AnalysisMetadata } from 'src/app/models/analysis-metadata/analysis-metada.model';
import { IncomeAnalysis } from 'src/app/models/income-analysis/income-analysis.model';

@Injectable({providedIn: 'root'})
export class IncomeAnalysisService {

    constructor(
        private localStorageBroker: LocalStorageBroker,
        private incomeAnalysisApiBroker: IncomeAnalysisApiBroker
    ) { }

    public getByIds(analysisMetadata: AnalysisMetadata): Observable<IncomeAnalysis>{
        return this.incomeAnalysisApiBroker.getByIds(analysisMetadata);
    }

    public updateStats(){
        const teamId = this.localStorageBroker.readUserCredential().TeamId;
        return this.incomeAnalysisApiBroker.putAnalysis(teamId);
    }
}