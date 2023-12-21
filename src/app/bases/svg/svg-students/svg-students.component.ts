import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-students',
  templateUrl: './svg-students.component.html',
  standalone: true,
})
export class SvgStudentsComponent {
  @Input()
  width = '24';

  @Input()
  height = '24';

  @Input()
  color = '#D2EEEB';
}
