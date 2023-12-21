import { Injectable } from '@angular/core';
import { ApiBroker } from './api.broker';
import { HttpClient } from '@angular/common/http';
import { StudentPerformance } from 'src/app/models/student-performances/model.student-performance';

@Injectable({providedIn: 'root'})
export class PerformanceApiBroker extends ApiBroker<StudentPerformance> {
    
    relativeUrl  = "api/Performances";
    
    constructor(http: HttpClient) {
        super(http);
    }

    public getPerformanceByStudentId(studentId: string) {
        return this.getById(studentId,this.relativeUrl, );
    }
}