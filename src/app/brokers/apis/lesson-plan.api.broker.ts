import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { LessonPlan } from 'src/app/models/lesson-plans/lesson-plan.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LessonPlanApiBroker extends ApiBroker<LessonPlan> {
    constructor(http: HttpClient) {
        super(http);
    }

    public postLessonPlan(lessonPlan: LessonPlan): Observable<LessonPlan> {
        const relativeUrl = "api/LessonPlans";

        return this.post(relativeUrl, lessonPlan);
    }
}