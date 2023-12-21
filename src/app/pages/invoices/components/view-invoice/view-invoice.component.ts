import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ViewInvoicesBtnGroupComponent } from '../view-invoices-btn-group/view-invoices-btn-group.component';
import { InvoiceCheckComponent } from '../invoice-check/invoice-check.component';
import { InvoiceService } from 'src/app/services/invoices/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoices/invoice.model';
import { Observable, map, takeUntil, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserCredentials } from 'src/app/models/user-credentials/user-credential.model';
import { LocalStorageBroker } from 'src/app/brokers/local-storages/local-storage.broker';

import { TeamsApiBroker } from 'src/app/brokers/apis/teams.api.broker';
import { InvoiceById } from 'src/app/models/invoices/invoice-by-id.model';
import { PaymentMethodStatus } from 'src/app/models/invoices/invoice-payment-method-status';
import { Options } from 'src/app/models/common/common.models';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';
import { SvgDirArrowComponent } from 'src/app/bases/svg/svg-dir-arrow/svg-dir-arrow.component';
import { TeamService } from 'src/app/services/teams/team.service';
import { Team } from 'src/app/models/teams/team.model';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.less'],
  standalone: true,
  imports: [
    ViewInvoicesBtnGroupComponent,
    InvoiceCheckComponent,
    NgIf,
    SvgDirArrowComponent,
    AsyncPipe,
  ],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewInvoiceComponent {
  /**
   */
  invoiceId!: string;

  /**
   */
  invoiceInfo$!: Observable<any>;

  /**
   */
  team$!: Team;

  /**
   */
  form!: UntypedFormGroup;

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
  isLoadingDelete = false;

  /**
   */
  invoice!: Invoice;

  /**
   */
  user = {
    companyName: 'Tarteeb',
    address: '(no address)',
    email: '(no email)',
    phone: '(no phone)',
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
   * @param route
   * @param $invoices
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private $invoices: InvoiceService,
    private fb: FormBuilder,
    private $destroy: NgDestroy,
    private cd: ChangeDetectorRef,
    private localStorageBroker: LocalStorageBroker,
    private $teams: TeamService
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
  private getInvoiceById() {
    this.$teams.getTeamById().subscribe((team: any) => {
      this.invoiceId = this.route.snapshot.paramMap.get('id')!;
      this.invoiceInfo$ = this.$invoices.getInvoiceById(this.invoiceId).pipe(
        map((result) => result),
        tap((v: any) => {
          this.invoice = {
            Client: {
              FirstName: v.client.firstName,
              LastName: v.client.lastName,
              PhoneNumber: v.client.phoneNumber,
            },
            CreatedDate: v.createdDate,
            ClientId: v.clientId,
            Discount: v.discount,
            InvoiceLines: [
              {
                Description: v.invoiceLines[0].description,
                EndDate: v.invoiceLines[0].endDate,
                Id: v.invoiceLines[0].id,
                InvoiceId: v.invoiceLines[0].invoiceId,
                StartDate: v.invoiceLines[0].startDate,
                Title: v.invoiceLines[0].title,
                Total: v.invoiceLines[0].total,
              },
            ],
            Id: v.id,
            IsPaid: v.isPaid,
            PaidAmount: v.paidAmount,
            PaidDate: v.paidDate,
            PaymentMethod: v.paymentMethod,
            Total: v.total,
            UpdatedDate: v.updatedDate,
          };
        })
      );
      this.user.companyName = team.teamName;
      this.cd.markForCheck();
    });
  }

  /**
   *.Client
   */
  ngOnInit() {
    this.initForm();
    this.getInvoiceById();
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
    this.getInvoiceById();
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
   * @param invoiceId
   */
  deleteInvoice(invoiceId: string) {
    this.isLoadingDelete = true;
    this.$invoices.deleteInvoiceById(invoiceId).subscribe((res) => {
      this.isLoadingDelete = false;
      this.router.navigate(['../invoices']);
      this.cd.markForCheck();
    });
  }
}
