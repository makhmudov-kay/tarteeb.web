import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { SvgGroupsComponent } from 'src/app/bases/svg/svg-groups/svg-groups.component';
import { Options } from 'src/app/models/common/common.models';

@Component({
  selector: 'app-selector-data',
  templateUrl: './selector-data.component.html',
  styleUrls: ['./selector-data.component.less'],
  standalone: true,
  imports: [SelectorComponent, SvgGroupsComponent, NgIf],
})
export class SelectorDataComponent {
  /**
   */
  @Input()
  labelTitle!: string;

  /**
   */
  @Input()
  selectorData!: Options[];

  /**
   */
  @Input()
  selectedValue!: string;

  /**
   */
  @Input()
  icon!: string;

  /**
   */
  @Input()
  editingGroupId!: string | null;

  /**
   */
  @Output()
  selectedValueChange = new EventEmitter<string>();
}
