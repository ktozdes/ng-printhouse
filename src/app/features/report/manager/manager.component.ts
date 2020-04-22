import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  userID = 'all';
  sortBy = 'date_desc';
  managerList: User[];
  results: any;
  page = 1;

  constructor(private reportService: ReportService,
              private userService: UserService) {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    monthAgo.setDate(1);
    this.startDate = monthAgo;
    this.endDate = new Date();
    this.getUsers();
  }

  ngOnInit() {
  }

  getUsers() {
    this.userService.listManager().subscribe({
      next: (res: any) => {
        this.managerList = res.users;
      },
      error: null,
      complete: () => {
      }
    });
  }
  getReport() {
    const startDateString = this.startDate.getFullYear() + '/' + (this.startDate.getMonth() + 1) + '/' + this.startDate.getDate() ;
    const endDateString = this.endDate.getFullYear() + '/' + (this.endDate.getMonth() + 1) + '/' + this.endDate.getDate() ;

    this.reportService.manager(startDateString, endDateString, this.sortBy, this.userID, this.page).subscribe({
      next: (res: any) => {
        console.log(res);
        this.results = (this.page <= 1 || !this.results) ? res : this.results.concat(res);
      },
      error: null,
      complete: () => {
      }
    });
  }

  onScroll() {
    this.page++;
    this.getReport();
  }

  onSubmit() {
    this.page = 1;
    this.getReport();
  }

}
