import { Routes } from '@angular/router';
import { AuthGuardService } from './app/services/auth/auth.guard';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./app/pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./app/pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'payroll',
    loadComponent: () =>
      import('./app/pages/payroll/payroll.component').then(
        (c) => c.PayrollComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'accounting',
    loadComponent: () =>
      import('./app/pages/accounting/accounting.component').then(
        (c) => c.AccountingComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'invoices',
    loadComponent: () =>
      import('./app/pages/invoices/invoices.component').then(
        (c) => c.InvoicesComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'invoices/:id',
    loadComponent: () =>
      import(
        './app/pages/invoices/components/view-invoice/view-invoice.component'
      ).then((c) => c.ViewInvoiceComponent),
    canActivate: [AuthGuardService],
  },
  {
    path: 'attendance',
    loadComponent: () =>
      import('./app/pages/attendance/attendance.component').then(
        (c) => c.AttendanceComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'students',
    loadComponent: () =>
      import('./app/pages/students/students.component').then(
        (c) => c.StudentsComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'students/:id',
    loadComponent: () =>
      import(
        './app/pages/students/components/performance/performance.component'
      ).then((c) => c.PerformanceComponent),
    canActivate: [AuthGuardService],
  },
  {
    path: 'groups',
    loadComponent: () =>
      import('./app/pages/groups/groups.component').then(
        (c) => c.GroupsComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'expenses',
    loadComponent: () =>
      import('./app/pages/expenses/expenses.component').then(
        (c) => c.ExpensesComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./app/pages/employees/employees.component').then(
        (c) => c.EmployeesComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./app/pages/settings/settings.component').then(
        (c) => c.SettingsComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./app/pages/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./app/pages/notifications/notifications.component').then(
        (c) => c.NotificationsComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'lessons',
    loadComponent: () =>
      import('./app/pages/lessons/lessons.component').then(
        (c) => c.LessonsComponent
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'messages',
    loadComponent: () =>
      import('./app/pages/messages/messages.component').then(
        (c) => c.MessagesComponent
      ),
    canActivate: [AuthGuardService],
  },
];
