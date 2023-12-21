import { Group } from '../groups/group.model';

export interface Client {
  groupName: string | null;
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  birthDate: Date;
  createdDate: Date;
  updatedDate: Date;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  role: number;
  groupId: string;
  teamId: string;
  enrolledDate: Date;
  group: Group;
  telegramUserId: string;
}
