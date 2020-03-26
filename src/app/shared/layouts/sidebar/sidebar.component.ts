import { Component, OnInit } from '@angular/core';
import { PermissionGuard } from '../../guards/permission.guard';
import { Store } from '@ngrx/store';
import { userState } from 'src/app/store/app-state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  permissions: Array<string>;
  constructor(private store: Store <any>,
    private permissionGuard: PermissionGuard) {
    const getState = this.store.select(userState);
    getState.subscribe((state) => {
      this.permissions = state.permissions;
    });
  }

  ngOnInit() {
    //this.permissionGuard.showMenuItem();
  }

}
