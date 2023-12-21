import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DateTimeBroker {
    constructor() { }

    public getCurrentDate(): Date {
        return new Date();
    }
}