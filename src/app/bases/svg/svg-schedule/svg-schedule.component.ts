import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-schedule',
  templateUrl: './svg-schedule.component.html',
  standalone: true,
})
export class SvgScheduleComponent {
  /**
   */
  @Input()
  width = '17';

  /**
   */
  @Input()
  height = '18';
}
