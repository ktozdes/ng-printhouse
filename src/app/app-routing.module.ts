import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { AppComponent } from './app.component';


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
    path: 'carousel',
    component: CarouselComponent
  },
  {
    path: '',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
