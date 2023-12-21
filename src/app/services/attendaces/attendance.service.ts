import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttendanceApiBroker } from 'src/app/brokers/apis/attendance.api.broker';
import { GuidBroker } from 'src/app/brokers/guids/guid.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { Attendance } from 'src/app/models/attendances/attendance.model';

@Injectable({providedIn: 'root'})
export class AttendanceService {
    constructor(
        private apiBroker : AttendanceApiBroker,
        private localStorageBroker: LocalStorageBroker,
        private guidBroker: GuidBroker) { }
    
    public putAttendance(attendance: Attendance) : Observable<Attendance> {
        return this.apiBroker.putAttendance(attendance);
    }

    public getByLessonId(lessonId: string) : Observable<Attendance[]> {

        return this.apiBroker.getAttendance(lessonId);
    }
}