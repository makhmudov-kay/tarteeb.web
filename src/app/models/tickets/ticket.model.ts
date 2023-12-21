export interface Ticket{
    id: string;
    title : string;
    description : string;
    priority : Priority;
    deadline : Date;
    status : TicketStatus;
    createdDate : Date;
    updatedDate : Date;
    assigneeId : string;
    createdUserId : string;
    updatedUserId : string;
    user: any;
    milestoneId : string;
    milestone : any;
}

export enum Priority
{
    LOW,
    MEDIUM,
    HIGH
}

export enum TicketStatus
{
    UNKNOWN,
    TODO,
    INPROGRESS,
    DONE
}