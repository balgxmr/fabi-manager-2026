import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/dashboard.page').then(m => m.DashboardPage),
      },
      {
        path: 'flights/:id',
        loadComponent: () => import('./features/flights/flight-detail/flight-detail.page').then(m => m.FlightDetailPage),
      },
      {
        path: 'crew',
        loadComponent: () => import('./features/crew/crew-list/crew-list.page').then(m => m.CrewListPage),
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/reports.page').then(m => m.ReportsPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
