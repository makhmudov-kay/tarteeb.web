import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseApiBroker } from 'src/app/brokers/apis/expense.api.broker';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';
import { Expense } from 'src/app/models/expenses/expense.model';

@Injectable({providedIn: 'root'})
export class ExpenseService {
    constructor(
        private apiBroker: ExpenseApiBroker,
        private localStorageBroker: LocalStorageBroker) { }
    
    public getExpense() : Observable<Expense[]> {
        const teamId = this.localStorageBroker.readUserCredential().TeamId;

        return this.apiBroker.getExpense(teamId);
    }

    //post
    public postExpense(expense: Expense) : Observable<Expense> {
        return this.apiBroker.postExpense(expense);
    }

    // delete
    public deleteExpense(expense: Expense) : Observable<Expense> {
        return this.apiBroker.deleteExpense(expense);
    }

    //put
    public putExpense(expense: Expense) : Observable<Expense> {
        return this.apiBroker.putExpense(expense);
    }
}