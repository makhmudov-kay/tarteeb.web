import { Client } from '../clients/client.model';
import { Score } from '../scores/score.model';

export interface StudentAttendance {
  Id: string;
  IsAbsent: boolean;
  StudentId: string;
  AttendanceId: string;
  Student: Client;
  Score: any;
}
