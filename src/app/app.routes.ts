import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Explorador } from './components/explorador/explorador';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'explorador',
    component: Explorador,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];