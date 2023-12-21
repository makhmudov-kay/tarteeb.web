import { Component, OnInit } from '@angular/core';
import { SvgCalculatorComponent } from 'src/app/bases/svg/svg-calculator/svg-calculator.component';

@Component({
  selector: 'app-payroll-header',
  templateUrl: './payroll-header.component.html',
  styleUrls: ['./payroll-header.component.less'],
  standalone: true,
  imports: [SvgCalculatorComponent]
})
export class PayrollHeaderComponent { }
