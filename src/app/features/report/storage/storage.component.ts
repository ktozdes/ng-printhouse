import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { PlateService } from 'src/app/services/plate.service';
import { Plate } from 'src/app/models/plate';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  sortBy = 'date_desc';
  plateID = 'all';
  plates: Plate[];
  storages: Storage[];
  page = 1;
  constructor(private reportService: ReportService,
              private plateService: PlateService,
              private permissionGuard: PermissionGuard) {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    monthAgo.setDate(1);
    this.startDate = monthAgo;
    this.endDate = new Date();
    if (this.permissionGuard.showMenuItem('report storage')) {
      this.getStorages();
      this.getPlates();
    }

  }
  getStorages() {
    const startDateString = this.startDate.getFullYear() + '/' + (this.startDate.getMonth() + 1) + '/' + this.startDate.getDate() ;
    const endDateString = this.endDate.getFullYear() + '/' + (this.endDate.getMonth() + 1) + '/' + this.endDate.getDate() ;

    this.reportService.storage(startDateString, endDateString, this.sortBy, this.plateID, this.page).subscribe({
      next: (res: any) => {
        this.storages = (this.page <= 1) ? res.storages.data : this.storages.concat(res.storages.data);
      },
      error: null,
      complete: () => {
      }
    });
  }

  getPlates() {
    this.plateService.list().subscribe({
      next: (res: any) => {
        this.plates = res.plates;
      },
      error: null,
      complete: () => {
      }
    });
  }

  onScroll() {
    this.page++;
    this.getStorages();
  }

  onSubmit() {
    this.page = 1;
    this.getStorages();
  }

  ngOnInit() {
  }

}
