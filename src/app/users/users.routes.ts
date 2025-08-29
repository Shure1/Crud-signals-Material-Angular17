import { Routes } from '@angular/router';

const usersRoute:Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/crud-page/crud-page.component').then(m => m.CrudPageComponent),
  }
];

export default usersRoute;