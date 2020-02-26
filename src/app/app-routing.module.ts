import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

import { AuthGuard } from './shared/guards/auth.guard';



const routes: Routes = [
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./features/order/order.module').then(m => m.OrderModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./features/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./features/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: '',
    loadChildren: () => import('./features/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
  { path: 'order', loadChildren: () => import('./features/order/order.module').then(m => m.OrderModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
