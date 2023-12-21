import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScoreApiBroker } from 'src/app/brokers/apis/score.api.broker';
import { Score } from 'src/app/models/scores/score.model';

@Injectable({providedIn: 'root'})
export class ScoreService {
    constructor(private scoreApiBroker: ScoreApiBroker) { }
    
    public postScore(score: Score): Observable<Score> { 
        return this.scoreApiBroker.postScore(score);
    }
}