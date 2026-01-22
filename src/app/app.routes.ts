import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactiveform',
    loadComponent: () => import('./components/reactiveform/reactiveform').then(m => m.Reactiveform)
  }
];
