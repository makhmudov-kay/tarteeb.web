import { Component } from '@angular/core';
import { SettingHeaderComponent } from './components/setting-header/setting-header.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  standalone: true,
  imports: [SettingHeaderComponent]
})
export class SettingsComponent {}
