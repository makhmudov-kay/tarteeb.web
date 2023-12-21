import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgHomeComponent } from 'src/app/bases/svg/svg-home/svg-home.component';
import { SvgMailComponent } from 'src/app/bases/svg/svg-mail/svg-mail.component';
import { SvgPhoneComponent } from 'src/app/bases/svg/svg-phone/svg-phone.component';
import { InvoiceById } from 'src/app/models/invoices/invoice-by-id.model';
import { Invoice } from 'src/app/models/invoices/invoice.model';
import { UserCredentials } from 'src/app/models/user-credentials/user-credential.model';

@Component({
  selector: 'app-invoice-company-info',
  templateUrl: './invoice-company-info.component.html',
  styleUrls: ['./invoice-company-info.component.less'],
  standalone: true,
  imports: [SvgHomeComponent, SvgMailComponent, SvgPhoneComponent, NgIf],
})
export class InvoiceCompanyInfoComponent {
  /**
   */
  @Input()
  personalInfo!: any;

  /**
   */
  @Input()
  userInvoiceInfo!: any;
}
