import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorageComponent } from './storage.component';
import { CreateStorageComponent } from './create-storage/create-storage.component';
import { EditStorageComponent } from './edit-storage/edit-storage.component';

const routes: Routes = [
  {path: '', component: StorageComponent },
  {path: 'create', component: CreateStorageComponent },
  {path: 'edit', component: EditStorageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule { }
