import { Unit } from "./unit.model";

export interface ServiceOffering {
    id: string;
    title: string;
    description: string;
    billingPrice: number;
    billingUnit: Unit;
    payingPrice: number;
    payingUnit: Unit;

    teamId: string;
}


