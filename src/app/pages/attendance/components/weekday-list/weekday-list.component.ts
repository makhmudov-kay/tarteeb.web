import { filter } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { DayOfWeek } from '../add-lesson/models/day-of-week.model';

@Component({
  selector: 'app-weekday-list',
  templateUrl: './weekday-list.component.html',
  styleUrls: ['./weekday-list.component.less'],
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, NgIf],
})
export class WeekdayListComponent {
  /**
   */
  @Input()
  dayOfWeek!: DayOfWeek[];

  /**
   */
  @Input()
  form!: UntypedFormGroup;

  /**
   */
  @Input()
  type = 'radio';

  /**
   */
  @Output()
  isSelectedDays = new EventEmitter<DayOfWeek | DayOfWeek[]>();

  /**
   */
  dayPicker = '';

  /**
   */
  selectedDays: DayOfWeek[] = []; // Добавили массив для хранения выбранных дней

  /**
   *
   * @param e
   */
  selectedDay(e: DayOfWeek) {
    if (this.type === 'checkbox') {
      // Если тип - checkbox
      const index = this.selectedDays.findIndex((day) => day.date === e.date);

      if (index === -1) {
        // Если дня еще нет в массиве, добавляем его
        this.selectedDays.push(e);
      } else {
        // Если день уже есть в массиве, удаляем его
        this.selectedDays.splice(index, 1);
      }

      // Отправляем массив выбранных дней
      this.isSelectedDays.emit(this.selectedDays);
    } else if (this.type === 'radio') {
      // Если тип - radio, просто отправляем выбранный день
      this.isSelectedDays.emit(e);
    }
  }
}
