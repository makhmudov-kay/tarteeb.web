import { takeUntil } from 'rxjs';
import { DatePipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PageHeaderComponent } from 'src/app/bases/components/page-header/page-header.component';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { SvgScheduleComponent } from 'src/app/bases/svg/svg-schedule/svg-schedule.component';
import { SvgTelegraphComponent } from 'src/app/bases/svg/svg-telegraph/svg-telegraph.component';
import { Options } from 'src/app/models/common/common.models';
import { Group } from 'src/app/models/groups/group.model';
import { Lesson } from 'src/app/models/lessons/lesson.model';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';
import { GroupService } from 'src/app/services/groups/group.service';
import { LessonService } from 'src/app/services/lessons/lesson.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AttendanceService } from 'src/app/services/attendaces/attendance.service';
import { Attendance } from 'src/app/models/attendances/attendance.model';
import { TicketService } from 'src/app/services/tickets/ticket.service';
import { Ticket } from 'src/app/models/tickets/ticket.model';
import { ClientService } from 'src/app/services/clients/client.service';
import { Client } from 'src/app/models/clients/client.model';
import { GuidBroker } from 'src/app/brokers/guids/guid.broker';
import { AttendanceTableComponent } from './components/attendance-table/attendance-table.component';
import { ScoreService } from 'src/app/services/scores/score.service';
import {
  NzNotificationComponent,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SvgGroupsComponent } from 'src/app/bases/svg/svg-groups/svg-groups.component';
import { AddLessonComponent } from './components/add-lesson/add-lesson.component';
import { GuidList } from 'src/app/bases/components/f-a-q/guid-list.model';
import { FAQComponent } from 'src/app/bases/components/f-a-q/f-a-q.component';
import { ContractorService } from 'src/app/services/contractors/contractor.service';
import { Contractor } from 'src/app/models/contractors/contractor.model';
import { Room } from 'src/app/models/rooms/room.model';
import { RoomService } from 'src/app/services/rooms/room.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.less'],
  standalone: true,
  imports: [
    PageHeaderComponent,
    SvgTelegraphComponent,
    SvgScheduleComponent,
    SvgGroupsComponent,
    SelectorComponent,
    NgIf,
    NzAlertModule,
    NzButtonModule,
    AttendanceTableComponent,
    NzNotificationModule,
    NzButtonModule,
    NzIconModule,
    AddLessonComponent,
    FAQComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgDestroy],
})
export class AttendanceComponent implements OnInit {
  /**
   */
  lessonDaySelector: Options[] = [];

  /**
   */
  notification = NzNotificationComponent;

  /**
   */
  selectedDate = 0;

  /**
   */
  groupSelector: Options[] = [];

  /**
   */
  selectedGroup = 0;

  /**
   */
  thisMonday: Date = new Date();

  /**
   */
  thisSunday: Date = new Date();

  /**
   */
  today: Date = new Date();

  /**
   */
  isLoadingLessonSelector = false;

  /**
   */
  groupName?: string;

  /**
   */
  chosenLesson!: Lesson;

  /**
   */
  lessonId!: string;

  /**
   */
  attendance!: Attendance;

  /**
   */
  ticket!: Ticket;

  /**
   */
  students!: Client[];

  /**
   */
  isLoading = false;
  isLoadingBtn = false;
  /**
   */
  searchValueText!: string;

  /**
   */
  activeFilter = true;

  /**
   */
  isVisible = false;

  /**
   */
  guidList: GuidList[] = [
    {
      name: 'How attendance works?',
      link: '<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/a21944603f714527a4bef5afaf96c4fb?sid=58b96d72-fc16-4c79-93ed-dda0d73bd35a" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>',
    },
  ];

  /**
   */
  @ViewChild('template', { static: true })
  template!: TemplateRef<any>;

  /**
   */
  teachers!: Options[];

  /**
   */
  rooms!: Options[];

  /**
   */
  selectedLessonDay!: string;

  /**
   */
  selectedRoomValue!: string;
  selectedTeacherValue!: string;
  selectedGroupValue!: string;

  /**
   *
   * @param $group
   * @param cd
   * @param $lessons
   * @param datePipe
   * @param $destroy
   * @param $attendance
   * @param $ticket
   * @param $client
   * @param guidBroker
   * @param $score
   * @param notificationService
   */
  constructor(
    private $group: GroupService,
    private cd: ChangeDetectorRef,
    private $lessons: LessonService,
    private datePipe: DatePipe,
    private $destroy: NgDestroy,
    private $attendance: AttendanceService,
    private $ticket: TicketService,
    private $client: ClientService,
    private guidBroker: GuidBroker,
    private $score: ScoreService,
    private notificationService: NzNotificationService,
    private $contractor: ContractorService,
    private $room: RoomService
  ) {}

  /**
   *
   */
  private calcWeekDay() {
    // get the lesson for this week for the chosen group
    // calculate beginning and end of this week
    const today = new Date();
    const diff = today.getDay() - 1; // Get the difference from Monday
    const mondayDate = new Date(today);
    mondayDate.setDate(today.getDate() - diff); // Calculate Monday
    const sundayDate = new Date(mondayDate);
    sundayDate.setDate(mondayDate.getDate() + 6); // Calculate Sunday
    this.thisMonday = mondayDate;
    this.thisSunday = sundayDate;
  }

  /**
   *
   */
  private getGroups() {
    this.isLoading = true;
    this.$group
      .getActiveGroups()
      .pipe(takeUntil(this.$destroy))
      .subscribe((groups) => {
        this.groupSelector = [];
        const mappedData = groups.map((el: Group) => {
          return {
            value: el.id,
            label: el.name,
          };
        });
        this.groupSelector.push(...mappedData);
        this.selectedGroupValue = this.groupSelector[0].value;
        this.getLessonsByGroup(mappedData[0].value);
        this.cd.markForCheck();
      });
  }

  /**
   *
   * @param mappedData
   */
  getLessonsByGroup(groupId: string) {
    this.isLoading = true;
    this.isLoadingLessonSelector = true;
    this.$lessons
      .getByFilter(this.thisMonday, this.thisSunday, groupId)
      .pipe(takeUntil(this.$destroy))
      .subscribe((lessons) => {
        if (lessons.length) {
          this.createLessonSelector(lessons);
        } else {
          this.lessonsNotFound(groupId);
        }
        this.isLoadingLessonSelector = false;
        this.cd.markForCheck();
      });
  }

  /**
   *
   * @param lessons
   */
  private createLessonSelector(lessons: Lesson[]) {
    this.lessonDaySelector = [];
    const mappedData = lessons.map((el: Lesson) => {
      return {
        value: el,
        label: `${this.datePipe.transform(el.Date, 'dd-MMMM')} - ${el.Title}`,
        optional: {
          day: new Date(el.Date).getDate(),
          month: new Date(el.Date).getMonth(),
          year: new Date(el.Date).getFullYear(),
        },
      };
    });
    this.lessonDaySelector.push(...mappedData);
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const lessonDay = this.lessonDaySelector.find(
      (el) =>
        el.optional.day === day &&
        el.optional.month === month &&
        el.optional.year === year
    );

    this.selectedLessonDay = lessonDay?.value;
    this.chosenLesson = lessons[0];
    this.lessonId = this.chosenLesson.Id;
    this.getAttendance();
  }

  /**
   *
   * @param groupId
   */
  private lessonsNotFound(groupId: string) {
    this.selectedLessonDay = '';
    this.lessonDaySelector = [];
    this.attendance.StudentAttendances = [];
    this.groupName = this.groupSelector.find(
      (group) => group.value === groupId
    )?.label;
    this.isLoading = false;

    this.cd.markForCheck();
  }

  /**
   *
   */
  getAttendance() {
    this.$attendance.getByLessonId(this.lessonId).subscribe((result) => {
      if (result.length) {
        if (this.attendance && this.attendance.StudentAttendances.length) {
          const studentAttendance = [...this.attendance.StudentAttendances];
          this.attendance = {
            ...result[0],
            StudentAttendances: [...studentAttendance],
          };
        } else {
          this.attendance = result[0];
        }
        if (!this.attendance.IsDraft) {
          this.notificationService.template(this.template);
        }

        this.$ticket
          .getTicketsById(this.attendance.Lesson.Id)
          .subscribe((ticketData) => {
            this.ticket = ticketData;
            this.cd.markForCheck();
            this.getStudentsByGroupId();
          });
      }
    });
  }

  /**
   *
   */
  private getStudentsByGroupId() {
    this.$client
      .getAllByGroupId(this.attendance.Lesson.GroupId)
      .subscribe((data) => {
        data = data.filter((student) => student.isActive);
        this.students = data;
        this.cd.markForCheck();
        this.addStudentAttendance();
      });
  }

  /**
   *
   */
  private addStudentAttendance() {
    this.attendance.StudentAttendances = [];
    for (let i = 0; i < this.students.length; i++) {
      const studentAttendance = {
        Id: this.guidBroker.generateGuid(),
        IsAbsent: false,
        StudentId: this.students[i].id,
        AttendanceId: this.attendance.Id,
        Student: this.students[i],
        Score: {
          Id: this.guidBroker.generateGuid(),
          Grade: 0,
          Weight: 1,
          EffortLink: undefined,
          TicketId: this.ticket.id,
          UserId: this.students[i].id,
        },
      };

      this.attendance.StudentAttendances.push(studentAttendance);
    }
    this.isLoading = false;
    this.cd.markForCheck();
  }

  /**
   *
   */
  private getTeachers() {
    this.$contractor
      .getAll()
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        this.teachers = [];
        const mappedData = result.map((el: Contractor) => {
          return {
            value: el.id,
            label: el.firstName + ' ' + el.lastName,
          };
        });
        this.teachers.push(...mappedData);
        this.selectedTeacherValue = this.teachers[0].value;
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  private getRooms() {
    this.$room
      .getAllRooms()
      .pipe(takeUntil(this.$destroy))
      .subscribe((result) => {
        this.rooms = [];
        const mappedData = result.map((el: Room) => {
          return {
            value: el.id,
            label: el.name,
          };
        });
        this.rooms.push(...mappedData);
        this.selectedRoomValue = this.rooms[0].value;
        this.cd.markForCheck();
      });
  }

  /**
   *
   */
  ngOnInit(): void {
    this.calcWeekDay();
    this.getGroups();
    this.getTeachers();
    this.getRooms();
  }

  /**
   *
   * @param value
   */
  searchValue(value: string) {
    this.searchValueText = value;
  }

  /**
   *
   * @param id
   */
  filterByGroup(id: string) {
    this.getLessonsByGroup(id);
  }

  /**
   *
   * @param obj
   */
  toggleIsAbsent(obj: { IsAbsent: boolean; Id: string }) {
    this.attendance.StudentAttendances.forEach((student) => {
      if (student.Id === obj.Id) {
        student.IsAbsent = obj.IsAbsent;
      }
    });
    this.cd.markForCheck();
  }

  /**
   *
   * @param lesson
   */
  filterByLesson(lesson: Lesson) {
    this.isLoading = true;
    this.lessonId = lesson.Id;
    this.chosenLesson = lesson;
    this.getAttendance();
    this.cd.markForCheck();
  }

  /**
   *
   */
  submitAttendance() {
    this.isLoadingBtn = true;
    this.attendance.IsDraft = false;
    this.attendance.UpdatedDate = new Date(); //TODO: Make it UTC

    this.$attendance.putAttendance(this.attendance).subscribe(() => {
      const now = new Date();
      this.updateScore(now);

      this.notificationService.create(
        'success',
        'Attendance submitted successfully',
        ''
      );
      this.isLoadingBtn = false;
      this.cd.markForCheck();
    });
  }

  /**
   *
   * @param now
   */
  private updateScore(now: Date) {
    this.attendance.StudentAttendances.forEach((studentAttendance) => {
      if (
        studentAttendance.Score.Grade !== 0 ||
        studentAttendance.Score.EffortLink !== undefined
      ) {
        studentAttendance.Score.CreatedDate = now;
        studentAttendance.Score.UpdatedDate = now;

        this.$score.postScore(studentAttendance.Score).subscribe();
      }
    });
  }
}
