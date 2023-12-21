import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PageHeaderComponent } from 'src/app/bases/components/page-header/page-header.component';
import { SvgCalculatorComponent } from 'src/app/bases/svg/svg-calculator/svg-calculator.component';
import { PerformanceInfoComponent } from './components/performance-info/performance-info.component';
import { StudentPerformanceService } from 'src/app/services/student-performances/student-performance.service';
import { Observable, map, takeUntil } from 'rxjs';
import { StudentPerformance } from 'src/app/models/student-performances/model.student-performance';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { StatisticCard } from 'src/app/bases/components/statistic-card/card.model';
import { GroupService } from 'src/app/services/groups/group.service';
import { Group } from 'src/app/models/groups/group.model';
import {
  ATTENDANCE_PERCENTAGE,
  AVG_SCORE,
  MISSED_LESSON,
  TOTAL_INVOICES,
  TOTAL_LESSONS,
  TOTAL_MESSAGES,
} from './card-data';
import { SkeletonStatisticCardsComponent } from 'src/app/bases/components/skeleton-statistic-cards/skeleton-statistic-cards.component';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { MessagesService } from 'src/app/services/message/messages.service';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';
import { Message } from 'src/app/models/messages/message.model';
import { Options } from 'src/app/models/common/common.models';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.less'],
  standalone: true,
  imports: [
    RouterLink,
    PageHeaderComponent,
    SvgCalculatorComponent,
    PerformanceInfoComponent,
    SkeletonStatisticCardsComponent,
    ContentLoaderModule,
    NgIf,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgDestroy],
})
export class PerformanceComponent implements OnInit {
  /**
   */
  isLoading = false;
  studentPerformance$!: Observable<StudentPerformance>;
  id!: string;
  cardsInfo: StatisticCard[] = [];
  group?: Group;
  messages: Message[] = [];
  messagesByDate = new Map();
  monthesOption: Options[] = [];

  /**
   */
  avgScore = AVG_SCORE;
  atnPercentage = ATTENDANCE_PERCENTAGE;
  missedLessons = MISSED_LESSON;
  totalLessons = TOTAL_LESSONS;
  totalMessages = TOTAL_MESSAGES;
  totalInvoices = TOTAL_INVOICES;

  /**
   */
  route = inject(ActivatedRoute);
  $studentPerformance = inject(StudentPerformanceService);
  $group = inject(GroupService);
  $messages = inject(MessagesService);
  $destroy = inject(NgDestroy);
  cd = inject(ChangeDetectorRef);
  datePipe = inject(DatePipe);

  /**
   *
   * @param result
   */
  private getUserInfo(result: StudentPerformance) {
    this.cardsInfo = [];
    const groupId = result.student.groupId;
    this.avgScore.amount = result.averageScore;
    this.atnPercentage.amount = result.attendancePercentage;
    this.missedLessons.amount = result.missedClassesCount;
    this.totalLessons.amount = result.totalLessonsCount;
    this.totalMessages.amount = result.totalMessagesCount;
    this.totalInvoices.amount = result.totalInvoicesCount;
    this.$group
      .getGroups()
      .pipe(takeUntil(this.$destroy))
      .subscribe((res) => {
        this.group = res.find((group) => group.id === groupId);
        this.cd.markForCheck();
      });
    this.cardsInfo.push(
      this.avgScore,
      this.atnPercentage,
      this.missedLessons,
      this.totalLessons,
      this.totalMessages,
      this.totalInvoices
    );
    this.cd.markForCheck();
  }

  /**
   *
   * @param result
   */
  private getMessages(result: StudentPerformance) {
    const studenId = result.student.id;
    this.$messages
      .getMessagesByClientId(studenId)
      .pipe(takeUntil(this.$destroy))
      .subscribe((res) => {
        this.messages = res;
        const messagesByDate = res;
        for (let index = messagesByDate.length - 1; index >= 0; index--) {
          const message = messagesByDate[index];
          this.setMessageToMap(message);
        }
        this.cd.markForCheck();
      });
  }

  /**
   * 
   * @param message 
   */
  private setMessageToMap(message: Message) {
    const key = this.datePipe.transform(message.sentDate, 'd MMMM');
    const labelOption = this.datePipe.transform(
      message.sentDate,
      'MMMM yyyy'
    ) as string;
    const hasSameLabel = this.monthesOption.find(
      (el) => el.label === labelOption
    );
    if (!hasSameLabel) {
      this.monthesOption.push({
        label: labelOption,
        value: message.sentDate,
      });
    }

    let messages = this.messagesByDate.get(key);
    if (!messages) {
      messages = [];
      this.messagesByDate.set(key, messages);
    }
    messages.push(message);
  }

  /**
   *
   */
  private getStudentById(id: string) {
    this.studentPerformance$ = this.$studentPerformance
      .getPerformanceByStudentId(id)
      .pipe(
        map((result) => {
          this.getUserInfo(result);
          this.getMessages(result);
          return result;
        })
      );
  }

  /**
   *
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getStudentById(this.id);
    }
  }

  /**
   *
   */
  recalculate() {
    this.getStudentById(this.id);
  }
}
