import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgAccountingComponent } from 'src/app/bases/svg/svg-accounting/svg-accounting.component';
import { SvgBarsComponent } from 'src/app/bases/svg/svg-bars/svg-bars.component';
import { SvgDashboardComponent } from 'src/app/bases/svg/svg-dashboard/svg-dashboard.component';
import { SvgDotsComponent } from 'src/app/bases/svg/svg-dots/svg-dots.component';
import { SvgEmployeesComponent } from 'src/app/bases/svg/svg-employees/svg-employees.component';
import { SvgExpensesComponent } from 'src/app/bases/svg/svg-expenses/svg-expenses.component';
import { SvgGroupsComponent } from 'src/app/bases/svg/svg-groups/svg-groups.component';
import { SvgInvoicesComponent } from 'src/app/bases/svg/svg-invoices/svg-invoices.component';
import { SvgPaymentComponent } from 'src/app/bases/svg/svg-payment/svg-payment.component';
import { SvgSettingsComponent } from 'src/app/bases/svg/svg-settings/svg-settings.component';
import { SvgStudentsComponent } from 'src/app/bases/svg/svg-students/svg-students.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SvgTeacherComponent } from 'src/app/bases/svg/svg-teacher/svg-teacher.component';
import { SvgCalendarComponent } from 'src/app/bases/svg/svg-calendar/svg-calendar.component';
import { SvgMessagesComponent } from 'src/app/bases/svg/svg-messages/svg-messages.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  standalone: true,
  imports: [
    SvgDashboardComponent,
    SvgPaymentComponent,
    SvgCalendarComponent,
    SvgAccountingComponent,
    SvgInvoicesComponent,
    SvgStudentsComponent,
    SvgGroupsComponent,
    SvgBarsComponent,
    SvgDotsComponent,
    SvgExpensesComponent,
    SvgTeacherComponent,
    SvgEmployeesComponent,
    SvgMessagesComponent,
    SvgSettingsComponent,
    RouterLink,
    RouterLinkActive,
    NgClass,
    NzToolTipModule,
  ],
})
export class MenuComponent {
  /**
   */
  @Input()
  isCollapsed!: boolean;
}
