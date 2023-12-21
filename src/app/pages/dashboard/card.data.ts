import { StatisticCard } from '../../bases/components/statistic-card/card.model';

export const TOTAL_INCOME: StatisticCard = {
  title: 'Total revenue',
  amount: null,
  changes: null,
  description: 'total of all invoices',
  icon: 'income',
  isCost: true,
  isPercent: false,
};

export const COURSES: StatisticCard = {
  title: 'Total income',
  amount: null,
  changes: null,
  description: 'total of paid invoices',
  icon: 'courses',
  isCost: false,
  isPercent: false,
};

export const GROUPS: StatisticCard = {
  title: 'Groups',
  amount: null,
  changes: null,
  description: 'total number of groups',
  icon: 'groups',
  isCost: false,
  isPercent: false,
};

export const STUDENTS: StatisticCard = {
  title: 'Students',
  amount: null,
  changes: null,
  description: 'total number of students',
  icon: 'students',
  isCost: false,
  isPercent: false,
};
