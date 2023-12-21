import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { SvgBotComponent } from 'src/app/bases/svg/svg-bot/svg-bot.component';
import { SvgScheduleComponent } from 'src/app/bases/svg/svg-schedule/svg-schedule.component';
import { Options } from 'src/app/models/common/common.models';
import { Message } from 'src/app/models/messages/message.model';
import { MessageComponent } from 'src/app/pages/messages/components/message/message.component';

@Component({
  selector: 'app-messages-performance',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    SelectorComponent,
    SvgBotComponent,
    SvgScheduleComponent,
    MessageComponent,
    NzSelectModule,
    FormsModule,
  ],
})
export class MessagesPerformanceComponent {
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

  /**
   *
   * @param e
   */
  filterByMonthSelector(e: any) {}
}
