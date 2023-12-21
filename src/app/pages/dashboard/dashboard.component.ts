import { takeUntil } from 'rxjs';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { StatisticCardComponent } from '../../bases/components/statistic-card/statistic-card.component';
import { IncomeAnalysisService } from 'src/app/services/income-analysis/income-analysis.service';
import { AnalysisMetadataService } from 'src/app/services/analysis-metadata/analysis-metadata.service';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';
import { COURSES, GROUPS, STUDENTS, TOTAL_INCOME } from './card.data';
import { StatisticCard } from '../../bases/components/statistic-card/card.model';
import { FAQComponent } from 'src/app/bases/components/f-a-q/f-a-q.component';
import { GuidList } from 'src/app/bases/components/f-a-q/guid-list.model';
import { PageHeaderComponent } from 'src/app/bases/components/page-header/page-header.component';
import { SvgUpdateComponent } from 'src/app/bases/svg/svg-update/svg-update.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { SkeletonStatisticCardsComponent } from 'src/app/bases/components/skeleton-statistic-cards/skeleton-statistic-cards.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  standalone: true,
  imports: [
    NgFor,
    StatisticCardComponent,
    NgFor,
    FAQComponent,
    SvgUpdateComponent,
    PageHeaderComponent,
    DashboardHeaderComponent,
    SkeletonStatisticCardsComponent,
    NgIf,
  ],

  providers: [NgDestroy],
})
export class DashboardComponent implements OnInit {
  /**
   */
  guidList: GuidList[] = [
    {
      name: 'How to use dashboard?',
      link: '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/f75a8082e70648a58eb4060dcf2951aa?sid=dd5c18a3-65ec-4693-8c0e-7d8e72dcd232" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
    },
  ];

  /**
   */
  isLoading: boolean = false;

  /**
   */
  startOfMonth!: string;

  /**
   */
  endOfMonth!: string;

  /**
   */
  totalIncome = TOTAL_INCOME;
  courses = COURSES;
  groups = GROUPS;
  students = STUDENTS;
  cardsInfo: StatisticCard[] = [];

  /**
   */
  isLoadingData = false;

  /**
   */
  $incomeAnalysis = inject(IncomeAnalysisService);
  $analysisMetadata = inject(AnalysisMetadataService);
  $destroy = inject(NgDestroy);
  cd = inject(ChangeDetectorRef);
  $notification = inject(NzNotificationService);

  /**
   *
   */
  private getAnalysisData() {
    this.isLoadingData = true;
    this.$analysisMetadata
      .getAll()
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        if (result.length) {
          [this.startOfMonth, this.endOfMonth] = result[0].value.split('&&');
          this.getIncomeAnalysis();
          this.cd.markForCheck();
        }
      });
  }

  /**
   *
   */
  private getIncomeAnalysis() {
    this.$incomeAnalysis
      .getByIds({
        startOfMonth: this.startOfMonth,
        endOfMonth: this.endOfMonth,
      })
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        this.totalIncome.amount = result.totalRevenue;
        this.courses.amount = result.totalProfit; //CHANGE DATA
        this.groups.amount = result.groupsCount;
        this.students.amount = result.studentsCount;

        this.cardsInfo.push(
          this.totalIncome,
          this.courses,
          this.groups,
          this.students
        );

        this.isLoadingData = false;
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
   */
  updateStats() {
    this.isLoading = true;
    this.$incomeAnalysis.updateStats().subscribe(() => {
      this.$notification.info(
        'Updating statistics',
        'Your request has been received. Please, wait a few minutes and refresh the page.'
      );
      this.isLoading = false;
    });
  }
}
