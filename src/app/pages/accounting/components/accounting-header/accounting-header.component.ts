import { Component, OnInit } from '@angular/core';
import { SvgCalculatorComponent } from 'src/app/bases/svg/svg-calculator/svg-calculator.component';

@Component({
  selector: 'app-accounting-header',
  templateUrl: './accounting-header.component.html',
  styleUrls: ['./accounting-header.component.less'],
  standalone: true,
  imports: [SvgCalculatorComponent]
})
export class AccountingHeaderComponent { }
