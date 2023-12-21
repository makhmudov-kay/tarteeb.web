import { PaymentMethodStatus } from './invoice-payment-method-status';

export interface Invoice {
  Id: string;
  IsPaid: boolean;
  Total: number;
  CreatedDate: Date;
  UpdatedDate: Date;
  ClientId: string;
  PaidDate: string | Date | null;
  Client: any;
  PaidAmount: number;
  PaymentMethod: number;
  InvoiceLines: any;
  Discount: number;
}
