import { takeUntil } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { InvoiceFiltersComponent } from './components/invoice-filters/invoice-filters.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { PageHeaderComponent } from 'src/app/bases/components/page-header/page-header.component';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { Invoice } from 'src/app/models/invoices/invoice.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { AnalysisMetadataService } from 'src/app/services/analysis-metadata/analysis-metadata.service';
import { Options } from 'src/app/models/common/common.models';
import { FiltersForInvoices } from 'src/app/models/invoices/invoices-filter.model';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';
import { SvgPlusComponent } from 'src/app/bases/svg/svg-plus/svg-plus.component';
import { SvgBellComponent } from 'src/app/bases/svg/svg-bell/svg-bell.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PaymentMethodStatus } from 'src/app/models/invoices/invoice-payment-method-status';
import { FAQComponent } from 'src/app/bases/components/f-a-q/f-a-q.component';
import { GuidList } from 'src/app/bases/components/f-a-q/guid-list.model';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.less'],
  standalone: true,
  imports: [
    InvoiceFiltersComponent,
    TableDataComponent,
    PageHeaderComponent,
    AsyncPipe,
    NgIf,
    SvgPlusComponent,
    SvgBellComponent,
    PaymentModalComponent,
    FAQComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesComponent implements OnInit {
  /**
   */
  guidList: GuidList[] = [
    {
      name: 'How to pay invoices?',
      link: '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/6b6a93c21e4847a086172ffe591c125e?sid=6cdaba7b-9a14-46b9-b50c-225da0c3f818" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
    },
  ];
  /**
   */
  invoices!: Invoice[];

  /**
   */
  isLoading = false;

  /**
   */
  isLoadingBtn = false;

  /**
   */
  isVisiblePaymentModal = false;

  /**
   */
  isFullPay = false;

  /**
   */
  isLoadingPay = false;

  /**
   */
  form!: UntypedFormGroup;

  /**
   */
  invoice!: Invoice;

  /**
   */
  get showFilter() {
    const isFilterActive = sessionStorage.getItem('showFilter');
    return isFilterActive ? JSON.parse(isFilterActive) : false;
  }

  /**
   */
  monthesSelector!: Options[];

  /**
   */
  filter: FiltersForInvoices = {
    groupId: '',
    startOfMonth: null,
    endOfMonth: null,
    isPaid: null,
    today: null,
  };

  /**
   */
  paymentMethodOptions: Options[] = [
    { label: 'Cash', value: PaymentMethodStatus.cash },
    { label: 'Card transfer', value: PaymentMethodStatus.cardTransfer },
    { label: 'Bank transfer', value: PaymentMethodStatus.bankTransfer },
    { label: 'Other', value: PaymentMethodStatus.other },
  ];

  /**
   *
   * @param $invoices
   * @param $analysis
   * @param cd
   * @param $destroy
   */
  constructor(
    private $invoices: InvoiceService,
    private $analysis: AnalysisMetadataService,
    private cd: ChangeDetectorRef,
    private $destroy: NgDestroy,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {}

  /**
   *
   */
  private initForm() {
    this.form = this.fb.group({
      amount: [null, [Validators.required]],
      paymentMethod: [this.paymentMethodOptions[0].value],
    });
  }

  /**
   *
   */
  ngOnInit(): void {
    this.initForm();
    this.getAnalysisData();
    this.initFilter();
  }

  /**
   *
   */
  private initFilter() {
    const filter = sessionStorage.getItem('filter');
    if (filter) {
      this.filter = JSON.parse(filter);
    }
  }

  /**
   *
   */
  private getAnalysisData() {
    this.$analysis
      .getAll()
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        this.monthesSelector = result;
        const isFilter = sessionStorage.getItem('filter');
        if (!isFilter) {
          const [startOfMonth, endOfMonth] = result[0].value.split('&&');
          this.filter.startOfMonth = startOfMonth;
          this.filter.endOfMonth = endOfMonth;
        } else {
          this.filter.startOfMonth = JSON.parse(isFilter).startOfMonth;
          this.filter.endOfMonth = JSON.parse(isFilter).endOfMonth;
          this.filter.today = this.filter.today && new Date();
        }

        this.getInvoices(this.filter);
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  getInvoices(filter: FiltersForInvoices) {
    this.isLoading = true;
    this.$invoices
      .getFilteredInvoicesByTeamId(filter)
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        sessionStorage.setItem('filter', JSON.stringify(this.filter));
        this.isLoading = false;
        this.invoices = result;
        this.cd.markForCheck();
      });
  }

  /**
   *
   * @param value
   */
  searchValue(value: string) {
    const unsavedFilter = { ...this.filter };
    unsavedFilter.firstName = value;
    this.getInvoices(unsavedFilter);
  }

  /**
   *
   * @param value
   */
  filterByDaily(value: boolean) {
    if (value) {
      this.filter.today = new Date();
      this.getInvoices(this.filter);
      return;
    }
    this.filter.today = null;
    this.getInvoices(this.filter);
  }

  /**
   *
   * @param status
   */
  filterByStatus(status: string | null) {
    this.filter.isPaid = status;
    this.getInvoices(this.filter);
  }

  /**
   *
   * @param dateStatus
   */
  filterByDate(dateStatus: string) {
    this.isLoading = true;
    const [startOfMonth, endOfMonth] = dateStatus.toString().split('&&');
    this.filter.startOfMonth = startOfMonth;
    this.filter.endOfMonth = endOfMonth;
    this.getInvoices(this.filter);
  }

  /**
   *
   * @param dateStatus
   */
  filterByGroupId(groupId: string) {
    this.filter.groupId = groupId;
    this.getInvoices(this.filter);
  }

  /**
   *
   */
  notifyUnpaid() {
    this.isLoadingBtn = true;

    this.notification.info(
      'Notification request sent',
      'This takes a few minutes, you will be notified when it is done'
    );

    this.$invoices
      .notifyUnpaidInvoices()
      .pipe(takeUntil(this.$destroy))
      .subscribe();

    setTimeout(() => {
      this.notification.success(
        'Unpaid invoices notified',
        'All unpaid invoices have been notified successfully'
      );

      this.isLoadingBtn = false;
      this.cd.markForCheck();
    }, 3000);
  }

  /**
   *
   * @param invoice
   */
  openPayModal(invoice: Invoice) {
    this.invoice = invoice;
    this.isVisiblePaymentModal = true;
    this.cd.markForCheck();
  }

  /**
   *
   */
  submitPay() {
    const formRequest = this.form.getRawValue();
    const request = { ...this.invoice };
    request.PaidAmount += formRequest.amount
      ? +formRequest.amount
      : request.Total - request.PaidAmount;
    request.PaymentMethod = formRequest.paymentMethod;
    request.IsPaid = request.PaidAmount === request.Total;
    request.PaidDate = new Date();

    if (!this.isFullPay) {
      if (this.form.invalid) {
        this.form.controls['amount'].markAsTouched();
        this.form.updateValueAndValidity();
        return;
      }
      this.updateInvoice(request);
      return;
    } else {
      this.updateInvoice(request);
    }
  }

  /**
   *
   * @param request
   */
  private updateInvoice(request: Invoice) {
    this.isLoadingPay = true;
    this.$invoices
      .putInvoice(request)
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.refresh();
      });
  }

  /**
   *
   */
  refresh() {
    this.isVisiblePaymentModal = false;
    this.form.reset();
    this.form.controls['paymentMethod'].setValue(
      this.paymentMethodOptions[0].value
    );
    this.form.updateValueAndValidity();
    this.getInvoices(this.filter);
    this.isLoadingPay = false;
    this.cd.markForCheck();
  }

  /**
   *
   * @param invoice
   */
  cancelPaidInvoice(invoice: Invoice) {
    const request = { ...invoice };
    request.PaidAmount = 0;
    request.IsPaid = false;
    request.PaidDate = null;
    this.updateInvoice(request);
  }

  /**
   *
   * @param id
   */
  deleteInvoice(id: string) {
    this.$invoices.deleteInvoiceById(id).subscribe(() => {
      this.refresh();
    });
  }
}
