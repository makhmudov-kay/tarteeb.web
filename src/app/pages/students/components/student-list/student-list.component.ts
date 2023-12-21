import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Client } from 'src/app/models/clients/client.model';
import { DatePipe, NgFor } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.less'],
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    NzDropDownModule,
    NzPopconfirmModule,
    NgFor,
    DatePipe,
    NzIconModule,
    RouterLink,
  ],
})
export class StudentListComponent {
  /**
   */
  @Input()
  data: Client[] = [];

  /**
   */
  @Input()
  isLoading!: boolean;

  /**
   */
  @Output()
  editStudentData = new EventEmitter<Client>();

  /**
   */
  @Output()
  handleArchive = new EventEmitter<Client>();

  /**
   */
  @Output()
  handleDelete = new EventEmitter<Client>();

  /**
   */
  listOfCurrentPageData: readonly Client[] = [];

  /**
   *
   * @param nzMessageService
   */
  constructor(private nzMessageService: NzMessageService) {}

  /**
   *
   * @param listOfCurrentPageData
   */
  onCurrentPageDataChange(listOfCurrentPageData: readonly Client[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  /**
   *
   * @param student
   */
  editStudent(student: Client) {
    this.editStudentData.emit(student);
  }

  /**
   *
   * @param student
   */
  confirmArchive(student: Client) {
    this.handleArchive.emit(student);
  }

  /**
   *
   * @param student
   */
  confirmDelete(student: Client) {
    this.handleDelete.emit(student);
  }
}
