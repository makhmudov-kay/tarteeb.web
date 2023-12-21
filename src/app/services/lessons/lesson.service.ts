import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LessonApiBroker } from 'src/app/brokers/apis/lesson.api.broker';
import { GuidBroker } from 'src/app/brokers/guids/guid.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { Lesson } from 'src/app/models/lessons/lesson.model';

@Injectable({ providedIn: 'root' })
export class LessonService {
  constructor(
    private apiBroker: LessonApiBroker,
    private localStorageBroker: LocalStorageBroker,
    private guidBroker: GuidBroker
  ) {}

  public putLesson(lesson: Lesson): Observable<Lesson> {
    lesson.UpdatedDate = new Date().toISOString();

    return this.apiBroker.putLesson(lesson);
  }

  public getByFilter(
    start: Date,
    end: Date,
    groupId?: string
  ): Observable<Lesson[]> {
    const teamId = this.localStorageBroker.readUserCredential().TeamId;

    return this.apiBroker.getLessonsByFilter(teamId, start, end, groupId);
  }

  public getById(lessonId: string): Observable<Lesson> {
    return this.apiBroker.getLessonById(lessonId);
  }

  public delete(lesson: Lesson): Observable<Lesson> {
    return this.apiBroker.deleteLesson(lesson);
  }
}
