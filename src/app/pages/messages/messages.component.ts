import { Observable, map, takeUntil } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { MessageComponent } from './components/message/message.component';
import { SvgBotComponent } from 'src/app/bases/svg/svg-bot/svg-bot.component';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { Options } from 'src/app/models/common/common.models';
import { SvgScheduleComponent } from 'src/app/bases/svg/svg-schedule/svg-schedule.component';
import { Client } from 'src/app/models/clients/client.model';
import { ClientService } from 'src/app/services/clients/client.service';
import { MessagesService } from 'src/app/services/message/messages.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { GuidList } from 'src/app/bases/components/f-a-q/guid-list.model';
import { FAQComponent } from 'src/app/bases/components/f-a-q/f-a-q.component';
import { UnversalSearchComponent } from 'src/app/bases/components/unversal-search/unversal-search.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { SvgSearchComponent } from 'src/app/bases/svg/svg-search/svg-search.component';
import {
  NewClient,
  SearchUserByNamePipe,
} from './pipe/serach-user-by-name.pipe';
import { Message } from 'src/app/models/messages/message.model';
import { RadioGroupComponent } from 'src/app/bases/components/radio-group/radio-group.component';
import { ContractorService } from 'src/app/services/contractors/contractor.service';
import { Contractor } from 'src/app/models/contractors/contractor.model';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less'],
  standalone: true,
  imports: [
    UserComponent,
    NgFor,
    MessageComponent,
    SvgBotComponent,
    SelectorComponent,
    SvgScheduleComponent,
    NgIf,
    AsyncPipe,
    NzSpinModule,
    FAQComponent,
    UnversalSearchComponent,
    NzInputModule,
    FormsModule,
    SvgSearchComponent,
    RadioGroupComponent,
    NzSpinModule,
  ],
  providers: [SearchUserByNamePipe, NgDestroy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  /**
   */
  guidList: GuidList[] = [
    {
      name: 'Messages explained!',
      link: '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/a5acd079f455416585f542b831104875?sid=cdbea0a4-a24e-4f00-8458-f25abbccd2cc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
    },
  ];
  /**
   */
  monthesOption: Options[] = [];

  /**
   */
  radioOptions: Options[] = [
    {
      value: false,
      label: 'Students',
    },
    {
      value: true,
      label: 'Employees',
    },
  ];

  /**
   */
  selectedOption = 0;

  /**
   */
  selectedValue!: any;

  /**
   */
  messages$!: Observable<Message[]>;

  /**
   */
  clients!: Client[] | Contractor[];

  /**
   */
  searchValue = '';

  /**
   */
  activeUser!: number;

  /**
   */
  messages: Message[] = [];

  /**
   */
  messagesByDate = new Map();

  /**
   */
  isLoading = false;

  /**
   */
  isLoadingMessages = false;

  /**
   */
  get filteredUsers(): Contractor[] | NewClient[] {
    const users = this.searchUserByName.transform(
      this.clients,
      this.searchValue
    );
    this.isLoading = false;
    this.cd.markForCheck();
    return users;
  }

  /**
   *
   * @param clientService
   * @param $messages
   * @param searchUserByName
   */
  constructor(
    private clientService: ClientService,
    private $messages: MessagesService,
    private searchUserByName: SearchUserByNamePipe,
    private datePipe: DatePipe,
    private $employee: ContractorService,
    private cd: ChangeDetectorRef,
    private $destroy: NgDestroy
  ) {}

  /**
   *
   */
  ngOnInit(): void {
    this.getStudents();
  }

  /**
   *
   */
  private getStudents() {
    this.isLoading = true;
    // get clients
    this.clientService
      .getAll()
      .pipe(takeUntil(this.$destroy))
      .subscribe((clients: Client[]) => {
        // filter active ones
        this.clients = clients.filter((client) => client.isActive).reverse();
        this.cd.markForCheck();
      });
  }

  /**
   *
   * @param id
   */
  onUserClick(id: string, index: number): void {
    this.isLoadingMessages = true;
    this.activeUser = index;
    this.messages$ = this.$messages
      .getMessagesByClientId(id)
      .pipe(
        map((result) =>
          result.sort(
            (a, b) =>
              new Date(b.sentDate).getTime() - new Date(a.sentDate).getTime()
          )
        )
      );

    this.$messages
      .getMessagesByClientId(id)
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        if (result.length) {
          const messagesByDate = result;
          for (let index = messagesByDate.length - 1; index >= 0; index--) {
            const message = messagesByDate[index];
            this.setMessageToMap(message);
          }
          this.cd.markForCheck();
        } else {
          this.messagesByDate.clear();
        }
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
    this.isLoadingMessages = false;
    this.cd.markForCheck();
  }

  /**
   *
   * @param date
   */
  filterByMonthSelector(date: string) {}

  /**
   *
   * @param type
   */
  onChangeRadio(type: boolean) {
    if (type) {
      this.isLoading = true;
      this.$employee
        .getAll()
        .pipe(takeUntil(this.$destroy))
        .subscribe((employees: Contractor[]) => {
          this.clients = employees.filter((e) => e.isActive).reverse();
          this.cd.markForCheck();
        });
      return;
    }
    this.getStudents();
  }
}
