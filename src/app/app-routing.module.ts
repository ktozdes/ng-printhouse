import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';


const routes: Routes = [
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
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
