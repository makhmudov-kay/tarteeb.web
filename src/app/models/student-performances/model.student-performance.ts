import { Client } from '../clients/client.model';
export interface StudentPerformance {
  id: string;
  averageScore: number;
  attendancePercentage: number;
  missedClassesCount: number;
  student: Client;
  totalInvoicesCount: number;
  totalLessonsCount: number;
  totalMessagesCount: number;
}
