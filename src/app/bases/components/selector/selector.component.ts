import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SvgGroupsComponent } from '../../svg/svg-groups/svg-groups.component';
import { SvgArrowComponent } from '../../svg/svg-arrow/svg-arrow.component';
import { Options } from 'src/app/models/common/common.models';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
// import './selector.component.less';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.less'],
  standalone: true,
  imports: [
    NzSelectModule,
    FormsModule,
    SvgGroupsComponent,
    SvgArrowComponent,
    NgFor,
    NgStyle,
    NgClass,
    NgIf,
  ],
})
export class SelectorComponent {
  /**
   */
  @Input()
  selectorData!: Options[];

  /**
   */
  @Input()
  backgroundColor!: string;

  /**
   */
  @Input()
  selectedValue!: any;

  /**
   */
  @Input()
  isLoading!: boolean;

  /**
   */
  @Input()
  isDisabled!: boolean;

  /**
   */
  @Input()
  nzWidth!: boolean;

  /**
   */
  @Input()
  default!: boolean;

  /**
   */
  @Input()
  defaultText!: string;

  /**
   */
  @Input()
  size!: 'small' | 'large' | 'medium';

  /**
   */
  @Output()
  selectedValueChange = new EventEmitter<any>();
}
