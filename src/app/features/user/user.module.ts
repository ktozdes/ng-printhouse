import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';


@NgModule({
  declarations: [UserComponent, EditUserComponent, CreateUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class UserModule { }
