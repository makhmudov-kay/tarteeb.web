import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Contractor } from 'src/app/models/contractors/contractor.model';
import { DatePipe, NgFor } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.less'],
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
export class EmployeeListComponent {
  /**
   */
  @Input()
  data: Contractor[] = [];

  /**
   */
  @Input()
  isLoading!: boolean;

  /**
   */
  @Output()
  editingData = new EventEmitter<Contractor>();

  /**
   */
  listOfCurrentPageData: readonly Contractor[] = [];

  /**
   *
   * @param nzMessageService
   */
  constructor(private nzMessageService: NzMessageService) {}

  /**
   *
   * @param listOfCurrentPageData
   */
  onCurrentPageDataChange(listOfCurrentPageData: readonly Contractor[]): void {
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
