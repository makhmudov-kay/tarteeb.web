export interface Group {
  id: string;
  name: string;
  isStaffRelated: boolean;
  isArchived: boolean;
  teamId: string;
  createdDate: Date;
  updatedDate: Date;
}
