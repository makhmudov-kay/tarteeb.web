import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-arrow',
  templateUrl: './svg-arrow.component.html',
  standalone: true,
})
export class SvgArrowComponent {
  /**
   */
  @Input()
  width = '9';

  /**
   */
  @Input()
  height = '16';
}
