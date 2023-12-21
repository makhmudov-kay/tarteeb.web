import { Component, Input } from '@angular/core';
import { PerformanceInfoHeaderComponent } from '../performance-info-header/performance-info-header.component';
import { StatisticCardComponent } from 'src/app/bases/components/statistic-card/statistic-card.component';
import { StatisticCard } from 'src/app/bases/components/statistic-card/card.model';
import { NgFor, NgIf } from '@angular/common';
import { StudentPerformance } from 'src/app/models/student-performances/model.student-performance';
import { Group } from 'src/app/models/groups/group.model';
import { SkeletonStatisticCardsComponent } from 'src/app/bases/components/skeleton-statistic-cards/skeleton-statistic-cards.component';
import { Message } from 'src/app/models/messages/message.model';
import { SvgBotComponent } from 'src/app/bases/svg/svg-bot/svg-bot.component';
import { MessageComponent } from 'src/app/pages/messages/components/message/message.component';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { SvgScheduleComponent } from 'src/app/bases/svg/svg-schedule/svg-schedule.component';
import { Options } from 'src/app/models/common/common.models';
import { MessagesPerformanceComponent } from '../messages/messages.component';

@Component({
  selector: 'app-performance-info',
  templateUrl: './performance-info.component.html',
  styleUrls: ['./performance-info.component.less'],
  standalone: true,
  imports: [
    PerformanceInfoHeaderComponent,
    StatisticCardComponent,
    SkeletonStatisticCardsComponent,
    SvgBotComponent,
    MessageComponent,
    SelectorComponent,
    SvgScheduleComponent,
    NgFor,
    NgIf,
    MessagesPerformanceComponent,
  ],
})
export class PerformanceInfoComponent {
  /**
   */
  @Input()
  cardsInfo: StatisticCard[] = [];

  /**
   */
  @Input()
  studentPerformance!: StudentPerformance;

  /**
   */
  @Input()
  group?: Group;

  /**
   */
  @Input()
  messages!: Map<string, Message[]>;

  /**
   */
  @Input()
  messageCount!: number;

  /**
   */
  @Input()
  monthesOption!: Options[];
}
