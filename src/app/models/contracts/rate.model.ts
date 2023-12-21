import { RateType } from "./rateType.model";

export interface Rate {
    Id: string;
    Value: number;
    Type: RateType;
    ContractId: string;
  }
