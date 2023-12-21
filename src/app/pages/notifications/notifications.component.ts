import { Component } from '@angular/core';
import { NotificationHeaderComponent } from './components/notification-header/notification-header.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.less'],
  standalone: true,
  imports: [NotificationHeaderComponent]
})
export class NotificationsComponent {}
