import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeekRange } from 'src/app/bases/services/date-logic.service';
import { SvgArrowComponent } from 'src/app/bases/svg/svg-arrow/svg-arrow.component';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.less'],
  standalone: true,
  imports: [SvgArrowComponent]
})
export class DateRangeComponent {
  /**
   */
  @Output()
  prevWeek = new EventEmitter()

  /**
   */
  @Output()
  nextWeek = new EventEmitter()

  /**
   */
  @Input()
  dateOptions!: WeekRange;
}
