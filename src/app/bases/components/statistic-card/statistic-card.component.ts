import { Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SvgInvoiceStatisticComponent } from 'src/app/bases/svg/svg-invoice-statistic/svg-invoice-statistic.component';
import { SvgInvoicesComponent } from 'src/app/bases/svg/svg-invoices/svg-invoices.component';
import { StatisticCard } from './card.model';
import { NumberSeparatePipe } from 'src/app/bases/pipes/number-separate.pipe';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { SvgCoursesStatisticComponent } from 'src/app/bases/svg/svg-courses-statistic/svg-courses-statistic.component';
import { SvgGroupsComponent } from 'src/app/bases/svg/svg-groups/svg-groups.component';
import { SvgStudentsComponent } from 'src/app/bases/svg/svg-students/svg-students.component';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.less'],
  standalone: true,
  imports: [
    NzIconModule,
    SvgInvoiceStatisticComponent,
    SvgInvoicesComponent,
    NumberSeparatePipe,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    SvgCoursesStatisticComponent,
    SvgGroupsComponent,
    SvgStudentsComponent,
  ],
})
export class StatisticCardComponent {
  /**
   */
  @Input()
  cardInfo!: StatisticCard;
}
