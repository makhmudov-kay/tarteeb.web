import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export interface WeekRange {
  start: { date: Date; label: string };
  end: { date: Date; label: string };
}

@Injectable()
export class DateLogicService {
  /**
   * Получаю начало и конец недели
   * @param date
   * @returns
   */
  getWeekBounds(date: Date): WeekRange {
    const clonedDate = new Date(date.getTime());
    clonedDate.setDate(clonedDate.getDate() - clonedDate.getDay());

    const startDate = new Date(clonedDate);
    const endDate = new Date(clonedDate);
    endDate.setDate(clonedDate.getDate() + 6);

    const formatDate = (date: Date): string => {
      return format(date, 'd MMM', {
        locale: enUS,
      });
    };

    return {
      start: { date: startDate, label: formatDate(startDate) },
      end: { date: endDate, label: formatDate(endDate) },
    };
  }

  /**
   * 
   * @param time 
   * @returns 
   */
  formatTime(time: string) {
    const timeParts = time.split(':');
    const hours = +timeParts[0];
    const minutes = +timeParts[1];

    // Создаем объект Date с фиктивной датой, так как нам важны только часы и минуты
    const formattedDate = new Date(2000, 0, 1, hours, minutes);

    // Используем Intl.DateTimeFormat для форматирования времени
    return formattedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
