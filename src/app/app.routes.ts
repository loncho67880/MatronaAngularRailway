import { Routes } from '@angular/router';
import { authGuard } from './home/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./home/pages/views/dashboard.component'),
    children: [
      {
        path: 'reservas',
        title: 'Reservas',
        loadComponent: () =>
          import('./home/pages/views/pages/reserve/reserve.component'),
      },
      {
        path: '**',
        redirectTo: 'reservas',
        pathMatch: 'full',
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    title: 'Auth',
    loadComponent: () => import('./home/pages/auth/auth/auth.component'),
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () =>
      import('./home/pages/auth/register/register.component'),
  },
  {
    path: 'verification/:code',
    title: 'VerificationEmail',
    loadComponent: () =>
      import(
        './home/pages/verification/email-verification/email-verification.component'
      ),
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
];
