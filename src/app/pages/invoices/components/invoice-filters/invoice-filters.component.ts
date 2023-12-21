import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SvgGroupsComponent } from 'src/app/bases/svg/svg-groups/svg-groups.component';
import { RadioGroupComponent } from 'src/app/bases/components/radio-group/radio-group.component';
import { Options } from 'src/app/models/common/common.models';
import { ToggleBtnComponent } from 'src/app/bases/components/toggle-btn/toggle-btn.component';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { SvgScheduleComponent } from 'src/app/bases/svg/svg-schedule/svg-schedule.component';
import { NgIf } from '@angular/common';
import { GroupService } from 'src/app/services/groups/group.service';
import { Group } from 'src/app/models/groups/group.model';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';

@Component({
  selector: 'app-invoice-filters',
  templateUrl: './invoice-filters.component.html',
  styleUrls: ['./invoice-filters.component.less'],
  standalone: true,
  imports: [
    FormsModule,
    SvgGroupsComponent,
    RadioGroupComponent,
    ToggleBtnComponent,
    SelectorComponent,
    SvgScheduleComponent,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgDestroy],
})
export class InvoiceFiltersComponent implements OnInit {
  /**
   */
  @Input()
  monthesSelector!: Options[];

  /**
   */
  @Output()
  dailyFilter = new EventEmitter<boolean>();

  /**
   */
  @Output()
  statusFilter = new EventEmitter<string | null>();

  /**
   */
  @Output()
  dateFilter = new EventEmitter<string>();

  /**
   */
  @Output()
  groupFilter = new EventEmitter<string>();

  /**
   */
  activePaidToday = false;

  /**
   */
  selectedOption = 1;

  /**
   */
  selectedValue!: any;

  /**
   */
  selectedDate!: string;

  /**
   */
  groupIdOption: Options[] = [
    {
      value: '',
      label: 'All groups',
    },
  ];

  /**
   */
  groupIdSelected!: string;

  /**
   */
  radioOptions: Options[] = [
    {
      value: true,
      label: 'Paid',
    },
    {
      value: null,
      label: 'All',
    },
    {
      value: false,
      label: 'Unpaid',
    },
  ];

  /**
   * 
   * @param $group 
   * @param cd 
   */
  constructor(private $group: GroupService, private cd: ChangeDetectorRef) {}

  /**
   *
   */
  private groupsFilter() {
    this.$group.getActiveGroups().subscribe((res) => {
      const mappedData = res.map((el: Group) => {
        return {
          value: el.id,
          label: el.name,
        };
      });
      this.groupIdOption.push(...mappedData);
      const savedFilter = sessionStorage.getItem('filter');
      if (savedFilter) {
        this.groupIdSelected = JSON.parse(savedFilter).groupId;
      }
      this.cd.markForCheck();
    });
  }

  /**
   *
   */
  ngOnInit(): void {
    this.groupsFilter();
    this.setSelectedDate();
    this.setSelectedPaidStatus();
    this.setPaidToday()
  }

  /**
   *
   */
  setSelectedDate() {
    const isFilter = sessionStorage.getItem('filter');
    if (isFilter) {
      this.selectedDate =
        JSON.parse(isFilter).startOfMonth +
        '&&' +
        JSON.parse(isFilter).endOfMonth;
    }
  }

  /**
   * 
   */
  setSelectedPaidStatus() {
    const isFilter = sessionStorage.getItem('filter');
    if (isFilter) {
      this.selectedValue = JSON.parse(isFilter).isPaid;
    }
  }

  /**
   * 
   */
  setPaidToday() {
    const isFilter = sessionStorage.getItem('filter');
    if (isFilter) {
      this.activePaidToday = JSON.parse(isFilter).today ? true : false;
    }
  }

  /**
   *
   * @param e
   */
  filterByPaidToday(e: boolean) {
    this.activePaidToday = e;
    this.dailyFilter.emit(e);
  }

  /**
   *
   * @param e
   */
  onChangeRadio(e: string | null) {
    this.statusFilter.emit(e);
  }

  /**
   *
   * @param value
   */
  filterByGroupId(value: string) {
    this.groupFilter.emit(value);
  }

  /**
   *
   * @param value
   */
  filterByDateSelector(value: string) {
    this.dateFilter.emit(value);
  }
}
