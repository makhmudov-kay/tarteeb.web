import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PerformanceApiBroker } from 'src/app/brokers/apis/performance.api.broker';
import { StudentPerformance } from 'src/app/models/student-performances/model.student-performance';

@Injectable({providedIn: 'root'})
export class StudentPerformanceService {
    constructor(
        private performanceApiBroker: PerformanceApiBroker
    ) { }
    
    public getPerformanceByStudentId(studentId: string) : Observable<StudentPerformance> {
        return this.performanceApiBroker.getPerformanceByStudentId(studentId);
    }
}