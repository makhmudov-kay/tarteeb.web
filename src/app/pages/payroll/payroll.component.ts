import { Component } from '@angular/core';
import { PayrollHeaderComponent } from './components/payroll-header/payroll-header.component';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.less'],
  standalone: true,
  imports: [PayrollHeaderComponent]
})
export class PayrollComponent {}
