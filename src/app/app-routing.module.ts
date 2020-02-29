import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { PermissionGuard } from './shared/guards/permission.guard';
import { SimpleDemoComponent } from './simple-demo-component/simple-demo-component.component';



const routes: Routes = [
  {
    path: 'upload',
    component: SimpleDemoComponent
  },
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
        canActivate: [PermissionGuard],
        loadChildren: () => import('./features/order/order.module').then(m => m.OrderModule),
        data: {permission: 'menu order'}
      },
      {
        path: 'report',
        canActivate: [PermissionGuard],
        loadChildren: () => import('./features/report/report.module').then(m => m.ReportModule),
        data: {permission: 'menu report'}
      },
      {
        path: 'payment',
        canActivate: [PermissionGuard],
        loadChildren: () => import('./features/payment/payment.module').then(m => m.PaymentModule),
        data: {permission: 'menu payment'}
      },
      {
        path: 'storage',
        canActivate: [PermissionGuard],
        loadChildren: () => import('./features/storage/storage.module').then(m => m.StorageModule),
        data: {permission: 'menu storage'}
      },
      {
        path: 'profile',
        canActivate: [PermissionGuard],
        loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
        data: {permission: 'menu profile'}
      }
    ]
  },
  {
    path: 'auth',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
