import { Observable } from 'rxjs';
import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.less'],
  standalone: true,
  imports: [
    NzTableModule,
    NgFor,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule,
    NzDropDownModule,
  ],
})
export class GroupsListComponent {
  /**
   */
  @Input()
  data: any[] = [];

  /**
   */
  @Input()
  isLoading!: boolean;

  /**
   */
  listOfCurrentPageData: readonly any[] = [];

  /**
   *
   * @param nzMessageService
   */
  constructor(private nzMessageService: NzMessageService) {}

  /**
   *
   * @param listOfCurrentPageData
   */
  onCurrentPageDataChange(listOfCurrentPageData: readonly any[]): void {
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
