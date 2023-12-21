import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBroker } from 'src/app/brokers/apis/api.broker';
import { LessonPlanApiBroker } from 'src/app/brokers/apis/lesson-plan.api.broker';
import { GuidBroker } from 'src/app/brokers/guids/guid.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { LessonPlan } from 'src/app/models/lesson-plans/lesson-plan.model';

@Injectable({providedIn: 'root'})
export class LessonPlanService {
    constructor(
        private apiBroker: LessonPlanApiBroker, 
        private localStorageBroker: LocalStorageBroker) { }

    create(lessonPlan: LessonPlan): Observable<LessonPlan> {
        
        return this.apiBroker.postLessonPlan(lessonPlan);
    }
}