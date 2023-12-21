import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from 'src/app/bases/components/page-header/page-header.component';
import { SvgPlusComponent } from 'src/app/bases/svg/svg-plus/svg-plus.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { Expense } from 'src/app/models/expenses/expense.model';
import { RadioGroupComponent } from 'src/app/bases/components/radio-group/radio-group.component';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { Options } from 'src/app/models/common/common.models';
import { SvgGroupsComponent } from 'src/app/bases/svg/svg-groups/svg-groups.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.less'],
  standalone: true,
  imports: [
    PageHeaderComponent,
    SvgPlusComponent,
    SvgGroupsComponent,
    ExpenseListComponent,
    SelectorComponent,
    RadioGroupComponent,]
})
export class ExpensesComponent implements OnInit  {
  get showFilter() {
    const isFilterActive = sessionStorage.getItem('showFilter');
    return isFilterActive ? JSON.parse(isFilterActive) : false;
  }
  
   /**
   */
   selectedRadioOption = 0;

   /**
    */
   selectedRadioValue!: any;
  /**
   */
  expenses!: Expense[];
/**
   */
typeIdOption: Options[] = [
  {
    value: '',
    label: 'All types',
  },
];

  /**
   */
  typeIdSelected!: string;
  /**
   */
  isLoading = false;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

    /**
   *
   * @param e
   */
    filterByTypeSelector(typeId: string) {
      // this.filter.ExpenseTypeId = typeId;
      // this.getEmployeesList(this.filter);
    }
  
}
