import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { NumberSeparatePipe } from 'src/app/bases/pipes/number-separate.pipe';
import { SvgBlueCheckComponent } from 'src/app/bases/svg/svg-blue-check/svg-blue-check.component';
import { SvgCheckComponent } from 'src/app/bases/svg/svg-check/svg-check.component';
import { SvgCloseComponent } from 'src/app/bases/svg/svg-close/svg-close.component';
import { SvgHomeComponent } from 'src/app/bases/svg/svg-home/svg-home.component';
import { SvgMailComponent } from 'src/app/bases/svg/svg-mail/svg-mail.component';
import { SvgPhoneComponent } from 'src/app/bases/svg/svg-phone/svg-phone.component';
import { SvgScheduleComponent } from 'src/app/bases/svg/svg-schedule/svg-schedule.component';
import { Options } from 'src/app/models/common/common.models';
import { PaymentMethodStatus } from 'src/app/models/invoices/invoice-payment-method-status';
import { Invoice } from 'src/app/models/invoices/invoice.model';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.less'],
  standalone: true,
  imports: [
    NzModalModule,
    SvgCloseComponent,
    SvgHomeComponent,
    SvgMailComponent,
    SvgPhoneComponent,
    SvgScheduleComponent,
    NumberSeparatePipe,
    SvgCheckComponent,
    SvgBlueCheckComponent,
    NzInputModule,
    NzButtonModule,
    SelectorComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
  ],
})
export class PaymentModalComponent {
  /**
   */
  @Input()
  isVisible!: boolean;

  /**
   */
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  /**
   */
  @Input()
  form!: UntypedFormGroup;

  /**
   */
  @Output()
  onSubmit = new EventEmitter();

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
  @Input()
  invoice!: Invoice;

  /**
   */
  @Input()
  isLoading!: boolean;

  /**
   */
  @Input()
  paymentMethodOptions!: Options[];

  /**
   */
  @ViewChild('textInput')
  textInput!: ElementRef;

  /**
   *
   */
  handleCancel() {
    this.isVisibleChange.emit(false);
  }

  /**
   *
   * @param value
   */
  selectedPaymentMethod(value: number) {
    this.form.controls['paymentMethod'].setValue(value);
    this.form.updateValueAndValidity();
  }

  /**
   *
   */
  submitPay() {
    this.onSubmit.emit();
  }

  /**
   *
   * @param isFullPay
   */
  isFullPayChangeHandler(isFullPay: boolean) {
    if (!isFullPay) {
      this.textInput.nativeElement.focus();
    }

    if (isFullPay) {
      this.form.controls['amount'].markAsUntouched();
    }
    this.isFullPayChange.emit(isFullPay);
  }
}
