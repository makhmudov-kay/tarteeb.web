import { Group } from "../groups/group.model";

export interface GroupAnalysis {
    id: string;
    studentsCount: number;
    invoicesCount: number;
    pendingInvoicesCount: number;  
    paidInvoicesCount: number;
    totalRevenue: number;
    totalProfit: number;
    startDate: string;
    endDate: string;
    timestamp:  string;
    groupId: string;   
    group: Group;
}