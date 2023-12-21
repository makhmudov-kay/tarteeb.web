import { Contractor } from "../contractors/contractor.model";
import { Group } from "../groups/group.model";
import { Room } from "../rooms/room.model";

export interface Lesson {
    Id: string;
    Title: string;
    StartTime: string;
    EndTime: string;
    Date: Date;
    Length: string;
    UpdatedDate: string;
    
    Group: Group;
    Teacher: Contractor;
    Room: any;
  }