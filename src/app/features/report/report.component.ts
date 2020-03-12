import { Component, OnInit } from '@angular/core';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private permissionGuard: PermissionGuard) { }

  ngOnInit() {
  }

}
