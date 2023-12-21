import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { SvgArrowComponent } from 'src/app/bases/svg/svg-arrow/svg-arrow.component';
import { WeekdayListComponent } from '../weekday-list/weekday-list.component';
import { DayOfWeek } from '../add-lesson/models/day-of-week.model';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.less'],
  standalone: true,
  imports: [NgFor, SvgArrowComponent, WeekdayListComponent],
})
export class DaySelectorComponent {
  /**
   */
  @Input()
  form!: UntypedFormGroup;

  /**
   */
  @Input()
  dayOfWeek: DayOfWeek[] = [];

  /**
   */
  @Input()
  currentWeekStartDate!: Date;

  /**
   */
  @Input()
  currentMonth!: string;

  /**
   */
  @Output()
  getPreviousWeek = new EventEmitter();

  /**
   */
  @Output()
  getNextWeek = new EventEmitter();

  /**
   */
  @Output()
  isSelectedDays = new EventEmitter<DayOfWeek | DayOfWeek[]>();
}
