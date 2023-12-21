import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { LessonsListComponent } from './components/lessons-list/lessons-list.component';
import { PageHeaderComponent } from 'src/app/bases/components/page-header/page-header.component';
import { SvgPlusComponent } from 'src/app/bases/svg/svg-plus/svg-plus.component';
import { LessonService } from 'src/app/services/lessons/lesson.service';
import {
  DateLogicService,
  WeekRange,
} from 'src/app/bases/services/date-logic.service';
import { Lesson } from 'src/app/models/lessons/lesson.model';
import { NgDestroy } from 'src/app/services/destroy/ng-destroy.service';
import { takeUntil } from 'rxjs';
import { LessonsFilterComponent } from './components/lessons-filter/lessons-filter.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.less'],
  standalone: true,
  imports: [LessonsListComponent, PageHeaderComponent, SvgPlusComponent, LessonsFilterComponent],
  providers: [DateLogicService, NgDestroy],
})
export class LessonsComponent implements OnInit {
  /**
   */
  dateOptions!: WeekRange;
  currentDate = new Date();
  data!: Lesson[];
  isLoading = false

  /**
   */
  $lessons = inject(LessonService);
  $dateLogic = inject(DateLogicService);
  $destroy = inject(NgDestroy)
  cd = inject(ChangeDetectorRef)

  /**
   *
   */
  ngOnInit(): void {
    this.setDateOptions(this.currentDate);
    this.getLessons(this.dateOptions.start.date, this.dateOptions.end.date);
  }

  /**
   *
  */
  private setDateOptions(date: Date) {
    this.dateOptions = this.$dateLogic.getWeekBounds(date);
  }

  /**
   * 
   */
  private getLessons(start: Date, end: Date) {
    this.isLoading = true
    this.$lessons
      .getByFilter(start, end).pipe(takeUntil(this.$destroy))
      .subscribe((result: Lesson[]) => {
        this.data = result;
        this.isLoading = false
      });
  }

  /**
   * 
   */
  prevWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.setDateOptions(this.currentDate);
    this.getLessons(this.dateOptions.start.date, this.dateOptions.end.date);
  }

  /**
   * 
   */
  nextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.setDateOptions(this.currentDate);
    this.getLessons(this.dateOptions.start.date, this.dateOptions.end.date);
  }

  /**
   * 
   */
  addLesson() { }

  /**
   * 
   * @param value 
   */
  searchValue(value: string) { }
}
