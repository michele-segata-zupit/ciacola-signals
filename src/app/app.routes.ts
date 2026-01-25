import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactiveform',
    loadComponent: () => import('./components/reactiveform/reactiveform').then(m => m.Reactiveform)
  },
  {
    path: 'signalform',
    loadComponent: () => import('./components/signal-form/signal-form.component').then(m => m.SignalForm)
  }
];
