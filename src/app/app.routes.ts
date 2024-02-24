import { Routes } from '@angular/router';
import { authGuard } from './home/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./home/pages/dashboard/dashboard.component'),
    children: [
      {
        path: 'bookings',
        title: 'Bookings',
        loadComponent: () =>
          import('./home/pages/dashboard/pages/bookings/bookings.component'),
        // canActivate: [authGuard],
      },
      {
        path: 'booking',
        title: 'Booking',
        loadComponent: () =>
          import('./home/pages/dashboard/pages/booking/reserve.component'),
      },
      {
        path: '**',
        redirectTo: 'booking',
        pathMatch: 'full',
      },
    ],
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
