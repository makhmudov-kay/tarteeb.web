import { Injectable } from '@angular/core';
import { Room } from 'src/app/models/rooms/room.model';
import { ApiBroker } from './api.broker';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoomApiBroker extends ApiBroker<Room> {
    relativeUrl = 'api/Rooms';

    constructor(http: HttpClient) {
        super(http);
     }
    
    public getAllByTeamId(teamId: string): Observable<Room[]> {
        let filter = `?$filter=teamId eq ${teamId}`;

        return this.http.get<Room[]>(`${this.baseUrl}/${this.relativeUrl}${filter}`);
    }

    public postRoom(room: Room): Observable<Room> {
        return this.post(this.relativeUrl, room);
    }


    public putRoom(room: Room): Observable<Room>{
        return this.put(this.relativeUrl, room);
    }

    public deleteRoom(room: Room): Observable<Room> {
        return this.delete(this.relativeUrl, room);
    }
}