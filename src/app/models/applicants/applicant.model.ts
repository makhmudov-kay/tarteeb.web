export interface Applicant{
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    status: ApplicationStatus;
    groupId: string;
    teamId: string;
}

export enum ApplicationStatus
{
    Pending,
    Accepted,
    Rejected
}