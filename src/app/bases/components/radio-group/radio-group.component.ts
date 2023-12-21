import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { Options } from 'src/app/models/common/common.models';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.less'],
  standalone: true,
  imports: [FormsModule, NzRadioModule, NgFor],
})
export class RadioGroupComponent {
  /**
   */
  @Input()
  radioOptions!: Options[];

  /**
   * Index of radioOptions array
   */
  @Input()
  selectedOption!: number;

  /**
   */
  @Input()
  selectedValue!: any;

  /**
   */
  @Output()
  selectedOptionChange = new EventEmitter<any>();
}
