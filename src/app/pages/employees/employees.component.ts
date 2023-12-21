import { takeUntil } from 'rxjs';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PageHeaderComponent } from 'src/app/bases/components/page-header/page-header.component';
import { Contractor } from 'src/app/models/contractors/contractor.model';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SvgPlusComponent } from 'src/app/bases/svg/svg-plus/svg-plus.component';
import { Options } from 'src/app/models/common/common.models';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { RadioGroupComponent } from 'src/app/bases/components/radio-group/radio-group.component';
import { SvgGroupsComponent } from 'src/app/bases/svg/svg-groups/svg-groups.component';
import { ContractorService } from 'src/app/services/contractors/contractor.service';
import { GroupService } from 'src/app/services/groups/group.service';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';
import { ContractorFilterModel } from 'src/app/models/contractors/contractor-filter.model';
import { Group } from 'src/app/models/groups/group.model';
import { AddEditEmployeesComponent } from './components/add-edit-employees/add-edit-employees.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.less'],
  standalone: true,
  imports: [
    PageHeaderComponent,
    EmployeeListComponent,
    SvgPlusComponent,
    SvgGroupsComponent,
    SelectorComponent,
    RadioGroupComponent,
    AddEditEmployeesComponent,
    NgIf,
  ],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent implements OnInit {
  /**
   */
  selectedRadioOption = 0;

  /**
   */
  selectedRadioValue!: any;

  /**
   */
  contractors!: Contractor[];

  /**
   */
  isLoading = false;

  /**
   */
  radioOptions: Options[] = [
    {
      value: true,
      label: 'Active',
    },
    {
      value: null,
      label: 'All',
    },
    {
      value: false,
      label: 'Archived',
    },
  ];

  /**
   */
  departmentIdOption: Options[] = [
    {
      value: '',
      label: 'All departments',
    },
  ];

  /**
   */
  get showFilter() {
    const isFilterActive = sessionStorage.getItem('showFilter');
    return isFilterActive ? JSON.parse(isFilterActive) : false;
  }

  /**
   */
  departmentIdOptionForChoise: Options[] = [];

  /**
   */
  departmentIdSelected!: string;

  /**
   */
  filter: ContractorFilterModel = {
    departmentId: '',
    isActive: true,
  };

  /**
   */
  isVisibleModal = false;

  /**
   */
  selectedPrefix!: string;

  /**
   */
  form!: FormGroup;

  /**
   */
  editingDepartmentId!: string | null;

  /**
   */
  employee!: Contractor;

  /**
   *
   * @param $contractor
   * @param $group
   * @param cd
   * @param $destroy
   */
  constructor(
    private $contractor: ContractorService,
    private $group: GroupService,
    private cd: ChangeDetectorRef,
    private $destroy: NgDestroy,
    private fb: FormBuilder
  ) {}

  /**
   *
   */
  private initForm(editingData?: Contractor) {
    if (editingData) {
      this.selectedPrefix = editingData?.phoneNumber.slice(0, 4);
    }
    this.form = this.fb.group({
      firstName: [editingData?.firstName, [Validators.required]],
      lastName: [editingData?.lastName, [Validators.required]],
      phoneNumber: [editingData?.phoneNumber.slice(4), [Validators.required]],
      email: [editingData?.email, [Validators.required, Validators.email]],
      birthDate: [editingData?.birthDate, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /**
   *
   */
  addEmployee() {
    this.editingDepartmentId = null;
    this.initForm();
    this.openModal();
  }

  /**
   *
   */
  private initGroups() {
    this.isLoading = true;
    this.$group
      .getActiveGroups(true)
      .pipe(takeUntil(this.$destroy))
      .subscribe((groups) => {
        this.departmentIdOption = [
          {
            value: '',
            label: 'All departments',
          },
        ];
        this.departmentIdOptionForChoise = [];
        const mappedData = groups.map((el: Group) => {
          return {
            value: el.id,
            label: el.name,
          };
        });
        this.departmentIdOption.push(...mappedData);
        this.departmentIdOptionForChoise.push(...mappedData);
        const savedFilter = sessionStorage.getItem('employeesFilter');
        if (savedFilter) {
          this.departmentIdSelected = JSON.parse(savedFilter).groupId;
        }
        this.cd.markForCheck();
        this.getEmployeesList(this.filter);
      });
  }

  /**
   *
   */
  private getEmployeesList(filter: ContractorFilterModel) {
    this.$contractor
      .getAll(filter)
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        sessionStorage.setItem('employeesFilter', JSON.stringify(this.filter));
        result.forEach((employee) => {
          employee.groupName = this.departmentIdOption.find(
            (group) => group.value === employee.groupId
          )?.label as string;
        });
        if (typeof filter.isActive === 'boolean') {
          const isActive = filter.isActive;
          result = result.filter((client) => client.isActive === isActive);
        }

        if (filter.departmentId) {
          result = result.filter(
            (client) => client.groupId === filter.departmentId
          );
        }
        this.contractors = result;
        this.isLoading = false;
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  ngOnInit(): void {
    this.initForm();
    this.initFilter();
    this.setSelectedActiveStatus();
    this.initGroups();
  }

  /**
   *
   */
  setSelectedActiveStatus() {
    const isFilter = sessionStorage.getItem('employeesFilter');
    if (isFilter) {
      this.selectedRadioValue = JSON.parse(isFilter).isActive;
    }
  }

  /**
   *
   */
  private initFilter() {
    const filter = sessionStorage.getItem('employeesFilter');
    if (filter) {
      this.filter = JSON.parse(filter);
    }
  }

  /**
   *
   */
  openModal() {
    this.isVisibleModal = true;
    this.cd.markForCheck();
  }

  /**
   *
   * @param employee
   */
  editEmploye(employee: Contractor) {
    this.initForm(employee);
    this.employee = employee;
    this.editingDepartmentId = employee.groupId;
    this.openModal();
  }

  /**
   *
   * @param e
   */
  onChangeRadio(activeStatus: boolean | null) {
    this.filter.isActive = activeStatus;
    this.getEmployeesList(this.filter);
  }

  /**
   *
   * @param e
   */
  filterByDepartmentSelector(groupId: string) {
    this.filter.departmentId = groupId;
    this.getEmployeesList(this.filter);
  }

  /**
   *
   * @param value
   */
  searchValue(value: string) {
    const unsavedFilter = { ...this.filter };
    unsavedFilter.firstName = value;
    this.getEmployeesList(unsavedFilter);
  }

  /**
   *
   */
  resetDepartmentId() {
    this.editingDepartmentId = null;
  }

  /**
   *
   */
  refresh() {
    this.initGroups();
  }
}
