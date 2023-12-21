import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateRangeComponent } from '../date-range/date-range.component';
import { WeekRange } from 'src/app/bases/services/date-logic.service';

@Component({
  selector: 'app-lessons-filter',
  templateUrl: './lessons-filter.component.html',
  styleUrls: ['./lessons-filter.component.less'],
  standalone: true,
  imports: [DateRangeComponent]
})
export class LessonsFilterComponent {
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
