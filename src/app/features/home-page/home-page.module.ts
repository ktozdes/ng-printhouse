import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { HomePageComponent } from './home-page.component';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule,
    AuthorizationModule
  ],
  exports: [
  ]
})
export class HomePageModule { }
