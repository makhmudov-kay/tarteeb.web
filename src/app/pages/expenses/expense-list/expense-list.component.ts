import { NgFor, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/models/expenses/expense.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.less'],
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    NzDropDownModule,
    NzPopconfirmModule,
    NgFor,
    DatePipe,
    NzIconModule,
  ],
})
export class ExpenseListComponent {
 /**
   */
 @Input()
 data: Expense[] = [];

 /**
  */
 @Input()
 isLoading!: boolean;

 /**
  */
 listOfCurrentPageData: readonly Expense[] = [];

 /**
  *
  * @param nzMessageService
  */
 constructor(private nzMessageService: NzMessageService) {}

 /**
  *
  * @param listOfCurrentPageData
  */
 onCurrentPageDataChange(listOfCurrentPageData: readonly Expense[]): void {
   this.listOfCurrentPageData = listOfCurrentPageData;
 }

 /**
  *
  */
 confirm(): void {
   this.nzMessageService.success('Paid was success');
 }

 /**
  *
  * @returns
  */
 beforeConfirm(): Observable<boolean> {
   return new Observable((observer) => {
     setTimeout(() => {
       observer.next(true);
       observer.complete();
     }, 3000);
   });
 }
}
