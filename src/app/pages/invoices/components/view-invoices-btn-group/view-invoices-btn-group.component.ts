import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgDeleteComponent } from 'src/app/bases/svg/svg-delete/svg-delete.component';
import { SvgDirArrowComponent } from 'src/app/bases/svg/svg-dir-arrow/svg-dir-arrow.component';
import { SvgEditComponent } from 'src/app/bases/svg/svg-edit/svg-edit.component';
import { SvgFileComponent } from 'src/app/bases/svg/svg-file/svg-file.component';
import { SvgPaymentComponent } from 'src/app/bases/svg/svg-payment/svg-payment.component';
import { SvgPrintComponent } from 'src/app/bases/svg/svg-print/svg-print.component';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { UntypedFormGroup } from '@angular/forms';
import { Options } from 'src/app/models/common/common.models';
import { Invoice } from 'src/app/models/invoices/invoice.model';
import { NgIf } from '@angular/common';
import { SvgCloseComponent } from 'src/app/bases/svg/svg-close/svg-close.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-view-invoices-btn-group',
  templateUrl: './view-invoices-btn-group.component.html',
  styleUrls: ['./view-invoices-btn-group.component.less'],
  standalone: true,
  imports: [
    SvgPaymentComponent,
    SvgEditComponent,
    SvgDirArrowComponent,
    SvgFileComponent,
    SvgPrintComponent,
    SvgDeleteComponent,
    RouterLink,
    PaymentModalComponent,
    NgIf,
    SvgCloseComponent,
    NzPopconfirmModule,
    NzIconModule,
  ],
})
export class ViewInvoicesBtnGroupComponent {
  /**
   */
  @Input()
  invoice!: Invoice;

  /**
   */
  @Input()
  isVisiblePaymentModal!: boolean;

  /**
   */
  @Output()
  isVisiblePaymentModalChange = new EventEmitter<boolean>();

  /**
   */
  @Input()
  isFullPay!: boolean;

  /**
   */
  @Output()
  isFullPayChange = new EventEmitter<boolean>();

  /**
   */
  @Output()
  deleteInvoice = new EventEmitter<string>();

  /**
   */
  @Input()
  form!: UntypedFormGroup;

  /**
   */
  @Input()
  isLoadingPay!: boolean;

  /**
   */
  @Input()
  isLoadingDelete!: boolean;

  /**
   */
  @Input()
  paymentMethodOptions!: Options[];

  /**
   */
  @Output()
  submitPay = new EventEmitter();

  /**
   */
  @Output()
  cancelPaid = new EventEmitter<Invoice>();

  /**
   *
   */
  openPaymentModal() {
    this.isVisiblePaymentModalChange.emit(true);
  }

  /**
   *
   * @param invoice
   */
  confirmCancel(invoice: Invoice) {
    this.cancelPaid.emit(invoice);
  }

  /**
   *
   * @param id
   */
  confirmDelete(id: string) {
    this.deleteInvoice.emit(id);
  }
}
