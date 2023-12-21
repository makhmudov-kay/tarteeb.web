import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SvgCheckComponent } from 'src/app/bases/svg/svg-check/svg-check.component';
import { SvgDangerComponent } from 'src/app/bases/svg/svg-danger/svg-danger.component';
import { SvgGroupsComponent } from 'src/app/bases/svg/svg-groups/svg-groups.component';
import { SvgTelegramComponent } from 'src/app/bases/svg/svg-telegram/svg-telegram.component';
import { Client } from 'src/app/models/clients/client.model';
import { Group } from 'src/app/models/groups/group.model';

@Component({
  selector: 'app-performance-info-header',
  templateUrl: './performance-info-header.component.html',
  styleUrls: ['./performance-info-header.component.less'],
  standalone: true,
  imports: [
    SvgGroupsComponent,
    SvgTelegramComponent,
    SvgCheckComponent,
    SvgDangerComponent,
    NgIf,
    NzToolTipModule,
  ],
})
export class PerformanceInfoHeaderComponent {
  /**
   */
  @Input()
  student!: Client;

  /**
   */
  @Input()
  group?: Group;
}
