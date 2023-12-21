import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SearchObjectPipe } from 'src/app/bases/pipes/searchText.pipe';
import { StudentAttendance } from 'src/app/models/attendances/student-attendance.model';

@Component({
  selector: 'app-attendance-table',
  templateUrl: './attendance-table.component.html',
  styleUrls: ['./attendance-table.component.less'],
  standalone: true,
  imports: [
    NzTableModule,
    NgFor,
    NzButtonModule,
    FormsModule,
    NzInputModule,
    SearchObjectPipe,
  ],
})
export class AttendanceTableComponent {
  /**
   */
  @Input()
  data!: StudentAttendance[];

  /**
   */
  @Input()
  isLoading!: boolean;

  /**
   */
  @Input()
  searchValue!: string;

  /**
   */
  @Output()
  isAbsent = new EventEmitter<{ IsAbsent: boolean; Id: string }>();

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
   * @param isAbsent
   */
  toggleIsAbsent(obj: { IsAbsent: boolean; Id: string }) {
    this.isAbsent.emit(obj);
  }
}
