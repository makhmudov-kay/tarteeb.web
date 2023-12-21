import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-sent-mark',
  templateUrl: './svg-sent-mark.component.html',
  standalone: true,
})
export class SvgSentMarkComponent {
  @Input()
  color = '#F2F2F2';
}
