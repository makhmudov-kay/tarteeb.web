import { DatePipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgHomeComponent } from 'src/app/bases/svg/svg-home/svg-home.component';
import { SvgMailComponent } from 'src/app/bases/svg/svg-mail/svg-mail.component';
import { SvgPhoneComponent } from 'src/app/bases/svg/svg-phone/svg-phone.component';
import { SvgScheduleComponent } from 'src/app/bases/svg/svg-schedule/svg-schedule.component';
import { InvoiceCompanyInfoComponent } from '../invoice-company-info/invoice-company-info.component';
import { Invoice } from 'src/app/models/invoices/invoice.model';
import { UserCredentials } from 'src/app/models/user-credentials/user-credential.model';
import { InvoiceById } from 'src/app/models/invoices/invoice-by-id.model';
import { NumberSeparatePipe } from 'src/app/bases/pipes/number-separate.pipe';

@Component({
  selector: 'app-invoice-check',
  templateUrl: './invoice-check.component.html',
  styleUrls: ['./invoice-check.component.less'],
  standalone: true,
  imports: [
    SvgHomeComponent,
    SvgMailComponent,
    SvgPhoneComponent,
    SvgScheduleComponent,
    NgFor,
    InvoiceCompanyInfoComponent,
    DatePipe,
    NumberSeparatePipe,
  ],
})
export class InvoiceCheckComponent {
  /**
   */
  private _userInvoiceInfo!: any;
  public get userInvoiceInfo(): any {
    return this._userInvoiceInfo;
  }
  @Input()
  public set userInvoiceInfo(v: any) {
    this._userInvoiceInfo = v;
    let currentDate = new Date(v.createdDate);
    currentDate.setDate(currentDate.getDate() + 3);
    this.formattedDate = this.datePipe.transform(currentDate, 'dd LLLL, yyyy');
  }

  /**
   */
  @Input()
  personalInfo!: any;

  /**
   */
  formattedDate!: string | null;

  constructor(private datePipe: DatePipe) {}

  /**
   *
   * @param date
   * @returns
   */
  setDateAfter3Days(date: Date) {
    let currentDate = new Date(date);
    let numberOfDaysToAdd = 3;
    return currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);
  }
}
