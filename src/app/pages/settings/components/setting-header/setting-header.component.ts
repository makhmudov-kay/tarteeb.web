import { Component, OnInit } from '@angular/core';
import { SvgDownloadComponent } from 'src/app/bases/svg/svg-download/svg-download.component';

@Component({
  selector: 'app-setting-header',
  templateUrl: './setting-header.component.html',
  styleUrls: ['./setting-header.component.less'],
  standalone: true, 
  imports: [SvgDownloadComponent]
})
export class SettingHeaderComponent { }
