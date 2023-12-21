import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxMaskDirective } from 'ngx-mask';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.less'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NgFor,
    NgxMaskDirective,
    NgIf,
    NzDatePickerModule,
  ],
})
export class PersonalDataComponent {
  /**
   */
  @Input()
  form!: UntypedFormGroup;

  /**
   */
  @Input()
  phonePrefix!: string[];

  /**
   */
  @Input()
  selectedPrefix!: string;

  /**
   */
  @Input()
  mainInfo!: boolean;

  /**
   */
  @Input()
  additionalInfo!: boolean;

  /**
   */
  @Output()
  selectedPrefixChange = new EventEmitter<string>();
}
