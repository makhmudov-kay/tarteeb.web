import { ExpenseType } from "./expense-type.model";

export interface Expense{
Id: string,
Description: string,
Amount: number,
Date: Date,
ExpenseTypeId: string,
ExpenseType: ExpenseType,
TeamId: string,
}

