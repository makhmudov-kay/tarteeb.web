import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Invoice } from 'src/app/models/invoices/invoice.model';
import { RouterLink } from '@angular/router';
import { SvgCheckComponent } from 'src/app/bases/svg/svg-check/svg-check.component';
import { SvgCrossComponent } from 'src/app/bases/svg/svg-cross/svg-cross.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.less'],
  standalone: true,
  imports: [
    NzTableModule,
    NgFor,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule,
    NzDropDownModule,
    NgIf,
    RouterLink,
    SvgCheckComponent,
    SvgCrossComponent,
    NzToolTipModule,
  ],
})
export class TableDataComponent {
  /**
   */
  @Input()
  data: Invoice[] = [];

  /**
   */
  @Input()
  isLoading!: boolean;

  /**
   */
  @Output()
  openModal = new EventEmitter<Invoice>();

  /**
   */
  @Output()
  cancelPaidInvoice = new EventEmitter<Invoice>();

  /**
   */
  @Output()
  deleteInvoice = new EventEmitter<string>();

  /**
   */
  listOfCurrentPageData: readonly Invoice[] = [];

  /**
   *
   * @param listOfCurrentPageData
   */
  onCurrentPageDataChange(listOfCurrentPageData: readonly Invoice[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  /**
   *
   * @param invoice
   */
  openPaymentModal(invoice: Invoice) {
    this.openModal.emit(invoice);
  }

  /**
   *
   */
  cancelPaid(invoice: Invoice) {
    this.cancelPaidInvoice.emit(invoice);
  }

  /**
   *
   * @param id
   */
  confirm(id: string) {
    this.deleteInvoice.emit(id);
  }
}
