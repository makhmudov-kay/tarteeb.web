import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, UntypedFormGroup } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { WeekdayListComponent } from '../weekday-list/weekday-list.component';
import { DayOfWeek } from '../add-lesson/models/day-of-week.model';

@Component({
  selector: 'app-repeat-on-week-day',
  templateUrl: './repeat-on-week-day.component.html',
  styleUrls: ['./repeat-on-week-day.component.less'],
  standalone: true,
  imports: [NzDatePickerModule, WeekdayListComponent, FormsModule],
})
export class RepeatOnWeekDayComponent {
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
  @Output()
  isSelectedDays = new EventEmitter<DayOfWeek | DayOfWeek[]>();

  /**
   */
  @Output()
  selectedRangeDate = new EventEmitter<Date[]>();
}
