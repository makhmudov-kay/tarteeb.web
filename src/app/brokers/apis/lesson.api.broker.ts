import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { LessonPlan } from 'src/app/models/lesson-plans/lesson-plan.model';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/models/lessons/lesson.model';

@Injectable({ providedIn: 'root' })
export class LessonApiBroker extends ApiBroker<Lesson> {
  relativeUrl = 'api/Lessons';

  constructor(http: HttpClient) {
    super(http);
  }

  public postLesson(lesson: Lesson): Observable<Lesson> {
    return this.post(this.relativeUrl, lesson);
  }

  public putLesson(lesson: Lesson): Observable<Lesson> {
    return this.put(this.relativeUrl, lesson);
  }

  public getLessonsByFilter(
    teamId: string,
    start: Date,
    end: Date,
    groupId?: string
  ): Observable<Lesson[]> {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    let roleTeamFilter = `?expand=Group,Teacher, Room&$filter=Group/TeamId eq ${teamId} and  Date ge ${start.toISOString()} and Date le ${end.toISOString()}`;

    if (groupId) {
      roleTeamFilter += ` and GroupId eq ${groupId} &$orderby=Date `;
    }
    return this.getAll(this.relativeUrl + roleTeamFilter);
  }

  public getLessonById(lessonId: string): Observable<Lesson> {
    return this.getById(lessonId, this.relativeUrl);
  }

  public deleteLesson(lesson: Lesson): Observable<Lesson> {
    return this.delete(this.relativeUrl, lesson);
  }
}
