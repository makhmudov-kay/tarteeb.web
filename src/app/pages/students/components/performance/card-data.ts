import { StatisticCard } from 'src/app/bases/components/statistic-card/card.model';

export const AVG_SCORE: StatisticCard = {
  title: 'Average score',
  amount: null,
  changes: null,
  description: 'compared to previous analysis',
  icon: 'statistic',
  isCost: false,
  isPercent: false,
};

export const ATTENDANCE_PERCENTAGE: StatisticCard = {
  title: 'Attendance percentage',
  amount: null,
  changes: null,
  description: 'compared to previous month',
  icon: 'schedule',
  isCost: false,
  isPercent: true,
};

export const MISSED_LESSON: StatisticCard = {
  title: 'Missed lessons',
  amount: null,
  changes: null,
  description: 'compared to last month',
  icon: 'bell',
  isCost: false,
  isPercent: false,
};

export const TOTAL_LESSONS: StatisticCard = {
  title: 'Total lessons',
  amount: null,
  changes: null,
  description: 'total number of lessons',
  icon: 'courses',
  isCost: false,
  isPercent: false,
};

export const TOTAL_MESSAGES: StatisticCard = {
  title: 'Total messages',
  amount: null,
  changes: null,
  description: 'total progress report',
  icon: 'dialog',
  isCost: false,
  isPercent: false,
};

export const TOTAL_INVOICES: StatisticCard = {
  title: 'Total invoices',
  amount: null,
  changes: null,
  description: 'compared to last payments',
  icon: 'income',
  isCost: false,
  isPercent: false,
};
