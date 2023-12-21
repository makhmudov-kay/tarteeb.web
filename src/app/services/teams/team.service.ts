import { Injectable } from '@angular/core';
import { TeamApiBroker } from 'src/app/brokers/apis/team.api.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';

@Injectable({providedIn: 'root'})
export class TeamService {
    constructor(
        private teamApiBroker: TeamApiBroker,
        private localStorageBroker: LocalStorageBroker) { }
    
    public getTeamById() {
        const teamId = this.localStorageBroker.readUserCredential().TeamId;
        return this.teamApiBroker.getTeamById(teamId);
    }
}