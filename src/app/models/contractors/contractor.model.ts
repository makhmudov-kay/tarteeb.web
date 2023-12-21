export interface Contractor {
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
  groupName: string;
  enrolledDate: Date;
}
