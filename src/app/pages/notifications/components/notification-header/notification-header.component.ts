import { Component } from '@angular/core';
import { SvgCircleArrowsComponent } from 'src/app/bases/svg/svg-circle-arrows/svg-circle-arrows.component';

@Component({
  selector: 'app-notification-header',
  templateUrl: './notification-header.component.html',
  styleUrls: ['./notification-header.component.less'],
  standalone: true,
  imports: [SvgCircleArrowsComponent]
})
export class NotificationHeaderComponent { }
