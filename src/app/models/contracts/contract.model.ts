import { PayDistributionType } from "./payDistributionType.model";
import { PayFrequency } from "./payFrequency.model";
import { Rate } from "./rate.model";
import { TimeCollectionType } from "./timeCollectionType.model";

export interface Contract {
Id: string;
TimeCollectionType: TimeCollectionType;
PayDistributionType: PayDistributionType;
Frequency: PayFrequency;
IsBillable: boolean;
UserId: string;
CreatedDate: string;
UpdatedDate: string;
CreatedUserId: string;
UpdatedUserId: string;
User?: any;
ContractServiceOfferings: ContractServiceOffering[];
}

export interface ContractServiceOffering {
Id: string;
ContractId: string;
ServiceOfferingId: string;
ServiceOffering?: any;
Contract?: any;
}


