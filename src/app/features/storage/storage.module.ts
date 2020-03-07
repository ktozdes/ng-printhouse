import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StorageRoutingModule } from './storage-routing.module';
import { StorageComponent } from './storage.component';
import { CreateStorageComponent } from './create-storage/create-storage.component';
import { EditStorageComponent } from './edit-storage/edit-storage.component';

@NgModule({
  declarations: [StorageComponent, CreateStorageComponent, EditStorageComponent],
  imports: [
    CommonModule,
    StorageRoutingModule,
    FormsModule
  ]
})
export class StorageModule { }
