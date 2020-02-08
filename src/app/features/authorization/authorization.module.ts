import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './authorization.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [AuthorizationComponent, LoginComponent, RegistrationComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    SharedModule
  ],
  exports: [
    AuthorizationComponent
  ]
})
export class AuthorizationModule { }
