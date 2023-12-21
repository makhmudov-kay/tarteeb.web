import { SvgGroupsComponent } from './../../../../bases/svg/svg-groups/svg-groups.component';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SvgCloseComponent } from 'src/app/bases/svg/svg-close/svg-close.component';
import { DaySelectorComponent } from '../day-selector/day-selector.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { SelectorComponent } from 'src/app/bases/components/selector/selector.component';
import { Options } from 'src/app/models/common/common.models';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RepeatOnWeekDayComponent } from '../repeat-on-week-day/repeat-on-week-day.component';
import { DayOfWeek } from './models/day-of-week.model';
import { NgClass, NgIf } from '@angular/common';
import { LessonPlanService } from 'src/app/services/lesson-plans/lesson-plan.service';
import { LessonPlan } from 'src/app/models/lesson-plans/lesson-plan.model';
import { GuidBroker } from 'src/app/brokers/guids/guid.broker';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.less'],
  standalone: true,
  imports: [
    NzModalModule,
    SvgCloseComponent,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzDatePickerModule,
    DaySelectorComponent,
    NzTimePickerModule,
    SelectorComponent,
    SvgGroupsComponent,
    NzButtonModule,
    RepeatOnWeekDayComponent,
    NgIf,
    NgClass,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLessonComponent implements OnInit {
  /**
   */
  @Input()
  isVisible!: boolean;

  /**
   */
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  /**
   */
  @Output()
  refresh = new EventEmitter();

  /**
   */
  @Input()
  selectedRoomValue!: string;

  /**
   */
  @Input()
  selectedTeacherValue!: string;

  /**
   */
  @Input()
  selectedGroupValue!: string;

  /**
   */
  @Input()
  groupSelector!: Options[];

  /**
   */
  @Input()
  roomSelector!: Options[];

  /**
   */
  @Input()
  teacherSelector!: Options[];

  /**
   */
  form!: UntypedFormGroup;

  /**
   */
  time = new Date();

  /**
   */
  dayOfWeek: DayOfWeek[] = [];

  /**
   */
  currentWeekStartDate: Date = new Date(); // Инициализируем текущую дату недели как текущую дату

  /**
   */
  currentMonth: string = '';

  /**
   */
  single = true;

  /**
   */
  lessonPlan: LessonPlan = {} as LessonPlan;

  /**
   */
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /**
   */
  isLoading = false;

  /**
   *
   * @param fb
   * @param cd
   * @param $lessonPlan
   * @param guidBroker
   */
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private $lessonPlan: LessonPlanService,
    private guidBroker: GuidBroker
  ) {}

  /**
   *
   */
  private initForm() {
    this.form = this.fb.group({
      title: [''], //not required
      single: [null, [Validators.required]], //optional required
      multi: [null, [Validators.required]], //optional required
      from: [null, [Validators.required]], //required
      to: [null, [Validators.required]], //required
      dateRange: [null, [Validators.required]], //optional required multi
      group: [this.selectedGroupValue],
      room: [this.selectedRoomValue],
      teacher: [this.selectedTeacherValue],
    });
  }

  /**
   *
   */
  ngOnInit() {
    this.initForm();
    this.updateWeekFromDate(this.currentWeekStartDate);
  }

  /**
   *
   */
  getNextWeek() {
    this.currentWeekStartDate.setDate(this.currentWeekStartDate.getDate() + 7);
    this.updateWeekFromDate(this.currentWeekStartDate);
  }

  /**
   *
   */
  getPreviousWeek() {
    this.currentWeekStartDate.setDate(this.currentWeekStartDate.getDate() - 7);
    this.updateWeekFromDate(this.currentWeekStartDate);
  }

  /**
   *
   * @param date
   */
  private updateWeekFromDate(date: Date) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayIndex = date.getDay();

    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - currentDayIndex);

    const monthCounts = new Map<string, number>(); // Для подсчета числа дней в каждом месяце

    this.dayOfWeek = Array.from({ length: 7 }, (_, i) => {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);

      const dayOfWeek = daysOfWeek[i];
      const fullDate = currentDate.toUTCString();
      const dayOfMonth = currentDate.getDate();
      const monthKey = currentDate.toLocaleString('en', { month: 'long' }); // Получаем название месяца

      monthCounts.set(monthKey, (monthCounts.get(monthKey) || 0) + 1); // Увеличиваем счетчик для текущего месяца

      return {
        day: dayOfWeek,
        fullDate: fullDate,
        date: dayOfMonth,
        month: monthKey,
      };
    });

    // Находим преобладающий месяц
    const predominantMonth = [...monthCounts.entries()].reduce(
      (a, e) => (e[1] > a[1] ? e : a),
      ['', 0]
    )[0];
    this.currentMonth = predominantMonth;

    this.cd.markForCheck();
  }

  /**
   *
   */
  handleCancel() {
    this.isVisibleChange.emit(false);
  }

  /**
   *
   * @param id
   */
  selectedGroup(id: string) {
    this.form.controls['group'].setValue(id);
    this.form.updateValueAndValidity();
  }

  /**
   *
   * @param id
   */
  selectedRoom(id: string) {
    this.form.controls['room'].setValue(id);
    this.form.updateValueAndValidity();
  }

  /**
   *
   * @param id
   */
  selectedTeacher(id: string) {
    this.form.controls['teacher'].setValue(id);
    this.form.updateValueAndValidity();
  }

  /**
   *
   */
  toggleDaySelector() {
    this.single = !this.single;
    if (this.single) {
      this.form.controls['multi'].removeValidators(Validators.required);
      this.form.controls['dateRange'].removeValidators(Validators.required);
      this.form.controls['multi'].markAsPristine();
      this.form.controls['dateRange'].markAsPristine();
      this.form.controls['single'].setValidators(Validators.required);
    } else {
      this.form.controls['single'].removeValidators(Validators.required);
      this.form.controls['single'].markAsPristine();
      this.form.controls['multi'].setValidators(Validators.required);
      this.form.controls['dateRange'].setValidators(Validators.required);
    }
    this.form.updateValueAndValidity();
    this.cd.markForCheck();
  }

  /**
   */
  isSelectedDays(e: DayOfWeek | DayOfWeek[]) {
    if (Array.isArray(e)) {
      const selectedDays: string[] = [];
      e.forEach((el) => {
        selectedDays.push(el.day);
      });
      this.form.controls['multi'].setValue(selectedDays);
    } else {
      console.log(e);

      this.form.controls['single'].setValue(e.fullDate);
    }
    this.form.updateValueAndValidity();
  }

  /**
   *
   * @param range
   */
  selectedRangeDate(range: Date[]) {
    this.form.controls['dateRange'].setValue(range);
    this.form.updateValueAndValidity();
  }

  /**
   *
   */
  checkValidation() {
    let count = 0;
    if (this.single) {
      if (!this.form.controls['single'].value) {
        ++count;
        this.setValidatorAndMarkAsDirty('single');
      }
    } else {
      if (!this.form.controls['multi'].value) {
        ++count;
        this.setValidatorAndMarkAsDirty('multi');
      }

      if (!this.form.controls['dateRange'].value) {
        ++count;
        this.setValidatorAndMarkAsDirty('dateRange');
      }
    }

    if (!this.form.controls['from'].value) {
      ++count;
      this.setValidatorAndMarkAsDirty('from');
    }

    if (!this.form.controls['to'].value) {
      ++count;
      this.setValidatorAndMarkAsDirty('to');
    }
    return count;
  }

  /**
   *
   * @param controlName
   */
  private setValidatorAndMarkAsDirty(controlName: string) {
    this.form.controls[controlName].markAsDirty();
    this.form.updateValueAndValidity();
  }

  /**
   *
   */
  createLesson() {
    const validationErrorsCount = this.checkValidation();
    if (validationErrorsCount > 0) {
      return;
    }

    this.isLoading = true;
    if (this.single) {
      this.lessonPlan.startDate = this.form.controls['single'].value;
      this.lessonPlan.endDate = this.lessonPlan.startDate;
      this.lessonPlan.weekdays = '';
    } else {
      this.lessonPlan.startDate = this.form.controls['dateRange'].value[0];

      this.lessonPlan.endDate = this.form.controls['dateRange'].value[1];

      this.lessonPlan.weekdays = this.form.controls['multi'].value
        .map((weekday: string) => this.weekdays.indexOf(weekday))
        .join(',');
    }
    this.lessonPlan.startDateTime = this.form.controls['from'].value;
    this.lessonPlan.endDateTime = this.form.controls['to'].value;
    this.lessonPlan.isRecurring = !this.single;
    this.lessonPlan.title = this.form.controls['title'].value.length
      ? this.form.controls['title'].value
      : 'Untitled lesson';
    this.lessonPlan.id = this.guidBroker.generateGuid();
    this.lessonPlan.createdDate = new Date();
    this.lessonPlan.groupId = this.form.controls['group'].value;
    this.lessonPlan.teacherId = this.form.controls['teacher'].value;
    this.lessonPlan.roomId = this.form.controls['room'].value;

    this.$lessonPlan.create(this.lessonPlan).subscribe({
      next: (result) => {
        this.lessonPlan = {} as LessonPlan;
        this.isLoading = false;
        this.isVisibleChange.emit(false);
        this.refresh.emit();
        this.cd.markForCheck();
      },
      error: (err) => {
        this.isLoading = false;
        this.cd.markForCheck();
      },
    });
  }
}
