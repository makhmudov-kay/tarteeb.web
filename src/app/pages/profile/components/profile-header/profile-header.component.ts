import { Component } from '@angular/core';
import { SvgDownloadComponent } from 'src/app/bases/svg/svg-download/svg-download.component';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.less'],
  standalone: true,
  imports: [SvgDownloadComponent]
})
export class ProfileHeaderComponent { }
