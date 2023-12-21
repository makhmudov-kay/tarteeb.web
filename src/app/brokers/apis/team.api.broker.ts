import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { HttpClient } from '@angular/common/http';
import { Team } from 'src/app/models/teams/team.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TeamApiBroker extends ApiBroker<Team> {
    relativeUrl = "api/Teams";
    constructor(http: HttpClient) {
        super(http);
    }
    
    public getTeamById(teamId: string) : Observable<Team> {
        return this.getById(teamId,this.relativeUrl);
    }
}