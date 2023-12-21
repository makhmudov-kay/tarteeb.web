import { takeUntil } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from 'src/app/bases/components/page-header/page-header.component';
import { RadioGroupComponent } from 'src/app/bases/components/radio-group/radio-group.component';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { UnversalSearchComponent } from 'src/app/bases/components/unversal-search/unversal-search.component';
import { SvgGroupsComponent } from 'src/app/bases/svg/svg-groups/svg-groups.component';
import { SvgScheduleComponent } from 'src/app/bases/svg/svg-schedule/svg-schedule.component';
import { Options } from 'src/app/models/common/common.models';
import { TableDataComponent } from '../invoices/components/table-data/table-data.component';
import { ClientService } from 'src/app/services/clients/client.service';
import { StudentListComponent } from './components/student-list/student-list.component';
import { Client } from 'src/app/models/clients/client.model';
import { AnalysisMetadataService } from 'src/app/services/analysis-metadata/analysis-metadata.service';
import { GroupService } from 'src/app/services/groups/group.service';
import { Group } from 'src/app/models/groups/group.model';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';
import { ClientFilterModel } from 'src/app/models/clients/client-filter.model';
import { SvgPlusComponent } from 'src/app/bases/svg/svg-plus/svg-plus.component';
import { AddStudentModalComponent } from './components/add-student-modal/add-student-modal.component';
import { NgIf } from '@angular/common';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FAQComponent } from 'src/app/bases/components/f-a-q/f-a-q.component';
import { GuidList } from 'src/app/bases/components/f-a-q/guid-list.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.less'],
  standalone: true,
  imports: [
    PageHeaderComponent,
    UnversalSearchComponent,
    RadioGroupComponent,
    SelectorComponent,
    SvgScheduleComponent,
    SvgGroupsComponent,
    StudentListComponent,
    SvgPlusComponent,
    AddStudentModalComponent,
    NgIf,
    FAQComponent,
  ],
  providers: [NgDestroy],
})
export class StudentsComponent implements OnInit {
  /**
   */
  selectedRadioOption = 0;

  /**
   */
  selectedRadioValue!: any;

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
  clients!: Client[];

  /**
   */
  isLoading = false;

  /**
   */
  get showFilter() {
    const isFilterActive = sessionStorage.getItem('showFilter');
    return isFilterActive ? JSON.parse(isFilterActive) : false;
  }

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
  groupIdOptionForChoise: Options[] = [];

  /**
   */
  groupIdSelected!: string;

  /**
   */
  filter: ClientFilterModel = {
    groupId: '',
    isActive: true,
  };

  /**
   */
  isVisibleModal = false;

  /**
   */
  form!: UntypedFormGroup;

  /**
   */
  editingGroupId!: string | null;

  /**
   */
  selectedPrefix!: string;

  /**
   */
  client!: Client;

  /**
   */
  guidList: GuidList[] = [
    {
      name: 'How to add/edit student?',
      link: '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/61560ce4e60b44eda8940274f1f44371?sid=8a3b7e6e-8c59-44d8-8824-275b5c2b55da" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
    },
  ];

  /**
   *
   * @param $client
   * @param $group
   * @param cd
   * @param $destroy
   */
  constructor(
    private $client: ClientService,
    private $group: GroupService,
    private cd: ChangeDetectorRef,
    private $destroy: NgDestroy,
    private fb: FormBuilder
  ) {}

  /**
   *
   */
  private initGroups() {
    this.isLoading = true;
    this.$group
      .getActiveGroups()
      .pipe(takeUntil(this.$destroy))
      .subscribe((groups) => {
        this.groupIdOption = [
          {
            value: '',
            label: 'All groups',
          },
        ];
        this.groupIdOptionForChoise = [];
        const mappedData = groups.map((el: Group) => {
          return {
            value: el.id,
            label: el.name,
          };
        });
        this.groupIdOption.push(...mappedData);
        this.groupIdOptionForChoise.push(...mappedData);
        const savedFilter = sessionStorage.getItem('clientFilter');
        if (savedFilter) {
          this.groupIdSelected = JSON.parse(savedFilter).groupId;
        }
        this.cd.markForCheck();
        this.getStudentsList(this.filter);
      });
  }

  /**
   *
   */
  private getStudentsList(filter: ClientFilterModel) {
    this.$client
      .getFilteredClients(filter)
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        sessionStorage.setItem('clientFilter', JSON.stringify(this.filter));
        result.forEach((student) => {
          student.groupName = this.groupIdOption.find(
            (group) => group.value === student.groupId
          )?.label as string;
        });
        if (typeof filter.isActive === 'boolean') {
          const isActive = filter.isActive;
          result = result.filter((client) => client.isActive === isActive);
        }
        this.clients = result;
        this.isLoading = false;
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  private initFilter() {
    const filter = sessionStorage.getItem('clientFilter');
    if (filter) {
      this.filter = JSON.parse(filter);
    }
  }

  /**
   *
   */
  private initForm(editingData?: Client) {
    if (editingData) {
      this.selectedPrefix = editingData?.phoneNumber.slice(0, 4);
    }
    this.form = this.fb.group({
      firstName: [editingData?.firstName, [Validators.required]],
      lastName: [editingData?.lastName, [Validators.required]],
      phoneNumber: [editingData?.phoneNumber.slice(4), [Validators.required]],
    });
  }

  /**
   *
   */
  ngOnInit(): void {
    this.initForm();
    this.initFilter();
    this.initGroups();
    this.setSelectedActiveStatus();
  }

  /**
   *
   * @param e
   */
  onChangeRadio(activeStatus: boolean | null) {
    this.filter.isActive = activeStatus;
    this.getStudentsList(this.filter);
  }

  /**
   *
   */
  setSelectedActiveStatus() {
    const isFilter = sessionStorage.getItem('clientFilter');
    if (isFilter) {
      this.selectedRadioValue = JSON.parse(isFilter).isActive;
    }
  }

  /**
   *
   * @param e
   */
  filterByGroupSelector(groupId: string) {
    this.filter.groupId = groupId;
    this.getStudentsList(this.filter);
  }

  /**
   *
   * @param value
   */
  searchValue(value: string) {
    const unsavedFilter = { ...this.filter };
    unsavedFilter.firstName = value;
    this.getStudentsList(unsavedFilter);
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
   * @param student
   */
  editStudent(student: Client) {
    this.initForm(student);
    this.client = student;
    this.editingGroupId = student.groupId;
    this.openModal();
  }

  /**
   *
   */
  addStudent() {
    this.editingGroupId = null;
    this.initForm();
    this.openModal();
  }

  /**
   *
   */
  resetGroupId() {
    this.editingGroupId = null;
  }

  /**
   *
   */
  refresh() {
    this.initGroups();
  }

  /**
   *
   * @param student
   */
  handleArchive(student: Client) {
    this.isLoading = true;
    let request = { ...student };
    if (request.isActive) {
      request.isActive = false;
    } else {
      request.isActive = true;
    }

    this.$client
      .putClient(request)
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.refresh();
      });
  }

  /**
   *
   * @param student
   */
  handleDelete(student: Client) {
    console.log(student);
  }
}
