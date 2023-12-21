import { Score } from '../scores/score.model';
import { StudentAttendance } from './student-attendance.model';

export interface Lesson {
  Id: string;
  Title: string;
  Date: string;
  GroupId: string;
}

export interface Attendance {
  Id: string;
  Comments: string;
  IsDraft: boolean;
  CreatedDate: Date;
  UpdatedDate: Date;
  Lesson: Lesson;

  StudentAttendances: StudentAttendance[];
}
