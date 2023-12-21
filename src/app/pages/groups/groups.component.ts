import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PageHeaderComponent } from 'src/app/bases/components/page-header/page-header.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupAnalysisService } from 'src/app/services/group-analysis/group-analysis.service';
import { AnalysisMetadataService } from 'src/app/services/analysis-metadata/analysis-metadata.service';
import { GroupAnalysis } from 'src/app/models/group-analysis/group-analysis.model';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { Options } from 'src/app/models/common/common.models';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';
import { SvgScheduleComponent } from 'src/app/bases/svg/svg-schedule/svg-schedule.component';
import { takeUntil } from 'rxjs';
import { AddEditModalComponent } from './components/add-edit-modal/add-edit-modal.component';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { SvgPlusComponent } from 'src/app/bases/svg/svg-plus/svg-plus.component';
import { GuidList } from 'src/app/bases/components/f-a-q/guid-list.model';
import { FAQComponent } from 'src/app/bases/components/f-a-q/f-a-q.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less'],
  standalone: true,
  imports: [
    PageHeaderComponent,
    GroupsListComponent,
    SelectorComponent,
    SvgScheduleComponent,
    AddEditModalComponent,
    NzNotificationModule,
    SvgPlusComponent,
    FAQComponent
  ],
  providers: [NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {
  /**
   */
  groups: GroupAnalysis[] = [];

  /**
   */
  monthesSelector!: Options[];

  /**
   */
  isLoading = false;

  /**
   */
  isVisibleModal = false;

  /**
   */
  dates!: any;

  /**
   */
  firstName = '';

  /**
   */
  startOfMonth!: string;
  /**
   */
  guidList: GuidList[] = [
    {
      name: 'About group insights',
      link:'<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/b64c6c95cb504a58bddf0a2431aa743d?sid=185bc1e3-61b5-4bd5-9f57-477fc607f0dc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>'  
    }
  ];
  /**
   */
  endOfMonth!: string;

  /**
   */
  selectedDate!: string;

  /**
   */
  get showFilter() {
    const isFilterActive = sessionStorage.getItem('showFilter');
    return isFilterActive ? JSON.parse(isFilterActive) : false;
  }

  /**
   *
   * @param $groupAnalisys
   * @param cd
   * @param $analysis
   * @param $destroy
   */
  constructor(
    private $groupAnalisys: GroupAnalysisService,
    private cd: ChangeDetectorRef,
    private $analysis: AnalysisMetadataService,
    private $destroy: NgDestroy,
    private notification: NzNotificationService
  ) {}

  /**
   *
   * @param startOfMonth
   * @param endOfMonth
   */
  private getDataGroupByFilter(startOfMonth: string, endOfMonth: string) {
    this.$groupAnalisys
      .getByIds({
        startOfMonth,
        endOfMonth,
        firstName: this.firstName,
      })
      .pipe(takeUntil(this.$destroy))
      .subscribe((res) => {
        this.groups = res;
        this.isLoading = false;
        this.cd.markForCheck();
      });
  }

    /**
    *
    */
    private getAnalysisData() {
      this.$analysis
        .getAll()
        .pipe(takeUntil(this.$destroy))
        .subscribe((result) => {
          this.monthesSelector = result;
          if (result.length) {
            [this.startOfMonth, this.endOfMonth] = result[0].value.split('&&');
            this.getDataGroupByFilter(this.startOfMonth, this.endOfMonth);
          }
          this.cd.markForCheck();
        });
    }

  /**
   *
   */
  ngOnInit(): void {
    this.getAnalysisData();
  }

  /**
   *
   * @param value
   */
  searchValue(value: string) {
    this.firstName = value;
    this.getDataGroupByFilter(this.startOfMonth, this.endOfMonth);
  }

  /**
   *
   * @param dateStatus
   */
  filterByDate(dateStatus: string) {
    this.isLoading = true;
    [this.startOfMonth, this.endOfMonth] = dateStatus.toString().split('&&');
    this.getDataGroupByFilter(this.startOfMonth, this.endOfMonth);
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
   */
  createdNewGroup() {
    this.getDataGroupByFilter(this.startOfMonth, this.endOfMonth);
    this.createNotification();
  }

  /**
   *
   */
  createNotification(): void {
    this.notification.create(
      'success',
      'Group created successfully',
      'We have successfully created the group. Insights will be generated soon...'
    );
  }
}
