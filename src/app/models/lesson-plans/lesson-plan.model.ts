export interface LessonPlan {
  id: string;
  title: string;
  isRecurring: boolean;
  startDate: Date;
  endDate: Date;
  weekdays: string; // comma separated list of weekdays
  startDateTime: string;
  endDateTime: string;
  createdDate: Date;
  groupId: string;
  teacherId: string;
  roomId: string;
}