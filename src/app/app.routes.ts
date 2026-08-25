import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'invite/sample-amina-zain-k7m2qx9p',
    loadComponent: () => import('./pages/invite/sample-amina-zain/sample-amina-zain').then((m) => m.SampleAminaZain),
  },
  {
    path: 'invite/asad-ruqia-r4n8w2sq',
    loadComponent: () => import('./pages/invite/asad-ruqia/asad-ruqia').then((m) => m.AsadRuqia),
  },
  { path: '**', redirectTo: '' },
];
