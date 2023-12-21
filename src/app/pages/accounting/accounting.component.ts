import { Component } from '@angular/core';
import { AccountingHeaderComponent } from './components/accounting-header/accounting-header.component';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.less'],
  standalone: true,
  imports: [AccountingHeaderComponent],
})
export class AccountingComponent {}
