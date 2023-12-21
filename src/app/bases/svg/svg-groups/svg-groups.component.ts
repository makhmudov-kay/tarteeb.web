import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-groups',
  templateUrl: './svg-groups.component.html',
  standalone: true,
})
export class SvgGroupsComponent {
  @Input()
  width = '22';

  @Input()
  height = '22';

  @Input()
  color = '#D2EEEB';
}
