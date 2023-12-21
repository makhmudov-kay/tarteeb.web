import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from 'src/app/models/expenses/expense.model';
import { ApiBroker } from './api.broker';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ExpenseApiBroker extends ApiBroker<Expense> {
    private relativeUrl = 'api/Expenses';
    
    constructor(http: HttpClient) {
        super(http);
     }
    //put
    public putExpense(expense: Expense): Observable<Expense> {
        return this.put(this.relativeUrl, expense);
    }
    //get
    public getExpense(teamId: string): Observable<Expense[]> {
        // team filter 
        const teamFilter = `?$filter=TeamId eq ${teamId}&expand=ExpenseType`;

        return this.http.get<Expense[]>(`${this.baseUrl}/${this.relativeUrl + teamFilter}`);
    }

    // post
    public postExpense(expense: Expense): Observable<Expense> {
        return this.post(this.relativeUrl, expense);
    }

    // delete
    public deleteExpense(expense: Expense): Observable<Expense> {
        return this.delete(this.relativeUrl, expense);
    }
}