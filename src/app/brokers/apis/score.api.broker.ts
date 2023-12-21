import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { Score } from 'src/app/models/scores/score.model';

@Injectable({providedIn: 'root'})
export class ScoreApiBroker extends ApiBroker<Score>{
    relativeUrl = "api/Scores";

    constructor(http: HttpClient) {
        super(http);
    }
    
    public postScore(score: Score) {
        return this.post(this.relativeUrl, score);
    }
}