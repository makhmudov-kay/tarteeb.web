import { Injectable } from '@angular/core';
import { RoomApiBroker } from 'src/app/brokers/apis/room.api.broker';
import { GuidBroker } from 'src/app/brokers/guids/guid.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { Room } from 'src/app/models/rooms/room.model';

@Injectable({providedIn: 'root'})
export class RoomService {
    constructor(
        private guidBroker: GuidBroker,
        private roomApiBroker: RoomApiBroker,
        private localStorageBroker: LocalStorageBroker) { }
    
    public getAllRooms() {
        const teamId = this.localStorageBroker.readUserCredential().TeamId;

        return this.roomApiBroker.getAllByTeamId(teamId);
    }

    public postRoom(room: Room) {
        room.id = this.guidBroker.generateGuid();
        room.teamId = this.localStorageBroker.readUserCredential().TeamId;
        
        return this.roomApiBroker.postRoom(room);
    }

    public putRoom(room: Room){
        return this.roomApiBroker.putRoom(room);
    }

    public deleteRoom(room: Room) {
        return this.roomApiBroker.deleteRoom(room);
    }
}