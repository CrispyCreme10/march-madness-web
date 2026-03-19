import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
  },
  {
    path: 'leaderboard',
    loadComponent: () =>
      import('./pages/leaderboard-page/leaderboard-page').then((m) => m.LeaderboardPage),
  },
  {
    path: 'tournament',
    loadComponent: () =>
      import('./pages/tournament-page/tournament-page').then((m) => m.TournamentPage),
  },
];
