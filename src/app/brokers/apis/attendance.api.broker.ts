import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { Observable } from 'rxjs';
import { Attendance } from 'src/app/models/attendances/attendance.model';

@Injectable({ providedIn: 'root' })
export class AttendanceApiBroker extends ApiBroker<Attendance> {
  constructor(http: HttpClient) {
    super(http);
  }

  public putAttendance(attendance: Attendance): Observable<Attendance> {
    const relativeUrl = 'api/Attendances';

    return this.put(relativeUrl, attendance);
  }

  public getAttendance(lessonId: string): Observable<Attendance[]> {
    const relativeUrl = 'api/Attendances';
    const roleTeamFilter = `?$filter=LessonId eq ${lessonId}&expand=Lesson`; //expand=Group,Teacher&$

    return this.http.get<Attendance[]>(
      `${this.baseUrl}/${relativeUrl + roleTeamFilter}`
    );
  }
}
