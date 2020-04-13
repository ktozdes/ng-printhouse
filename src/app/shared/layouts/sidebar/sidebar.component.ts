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
  permissions = [];
  constructor(private store: Store <any>) {
    const getState = this.store.select(userState);
    getState.subscribe((state) => {
      if (state.permissions) {
        this.permissions = state.permissions;
      }
    });
  }

  ngOnInit() {
  }

}
