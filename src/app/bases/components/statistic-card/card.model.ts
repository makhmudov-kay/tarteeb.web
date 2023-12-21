export interface StatisticCard {
  title: string;
  amount: number | null;
  changes: number | null;
  description: string;
  icon: string;
  isCost: boolean;
  isPercent: boolean
}
