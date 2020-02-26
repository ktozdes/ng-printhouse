import { Component, OnInit } from '@angular/core';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  constructor(private permissionGuard: PermissionGuard) {
  }

  ngOnInit() {
  }

}
