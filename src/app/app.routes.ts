import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', loadChildren: () => import('./users/users.routes') },
  { path: '**', redirectTo: '/usuarios' }
];
