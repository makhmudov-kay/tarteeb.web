import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DateLogicService } from 'src/app/bases/services/date-logic.service';
import { SvgCheckComponent } from 'src/app/bases/svg/svg-check/svg-check.component';
import { SvgCrossComponent } from 'src/app/bases/svg/svg-cross/svg-cross.component';
import { Lesson } from 'src/app/models/lessons/lesson.model';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.less'],
  standalone: true,
  imports: [
    NzTableModule,
    NgFor,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule,
    NzDropDownModule,
    NgIf,
    RouterLink,
    SvgCheckComponent,
    SvgCrossComponent,
    NzToolTipModule,
    DatePipe
  ],
})
export class LessonsListComponent {
  /**
   */
  @Input()
  data: any[] = [];

  /**
   */
  @Input()
  isLoading!: boolean;

  /**
   */
  @Output()
  openModal = new EventEmitter<any>();

  /**
   */
  @Output()
  deleteLesson = new EventEmitter<string>();

  /**
   */
  dateLogic = inject(DateLogicService)

  /**
   */
  listOfCurrentPageData: readonly any[] = [];

  /**
   *
   * @param listOfCurrentPageData
   */
  onCurrentPageDataChange(listOfCurrentPageData: readonly any[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  /**
   *
   * @param invoice
   */
  openTaskModal(lesson: Lesson) {
    this.openModal.emit(lesson);
  }

  /**
   *
   * @param id
   */
  confirm(id: string) {
    this.deleteLesson.emit(id);
  }

  /**
   * 
   * @param time 
   * @returns 
   */
  transformTime(time: string) {
    return this.dateLogic.formatTime(time)
  }
}
