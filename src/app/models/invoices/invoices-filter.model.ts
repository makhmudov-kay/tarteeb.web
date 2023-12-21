export interface FiltersForInvoices {
  groupId?: string;
  firstName?: string;
  startOfMonth?: Date | null | string;
  endOfMonth?: Date | null | string;
  isPaid?: boolean | null | string;
  today?: Date | null;
}
