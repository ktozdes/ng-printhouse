import { Component, OnInit } from '@angular/core';
import { PlateService } from 'src/app/services/plate.service';
import { Plate } from 'src/app/models/plate';
import { NgForm } from '@angular/forms';
import { Storage } from 'src/app/models/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-defect',
  templateUrl: './defect.component.html',
  styleUrls: ['./defect.component.scss']
})
export class DefectComponent implements OnInit {
  plateList: Plate[];
  storage = new Storage();
  comment: string;
  constructor(private plateService: PlateService,
              private router: Router) {
    this.getPlates();
  }

  ngOnInit() {
  }

  getPlates() {
    this.plateService.list().subscribe({
      next: (res: any) => {
        this.plateList = res.plates;
      },
      error: null,
      complete: () => {
      }
    });
  }

  onSubmit(f: NgForm): void {
    if (!this.storage.plate_id && !this.storage.quantity) {
      console.log('no submit');
      return ;
    }
    const result = window.confirm('Подтвердите брак');
    if (result) {
      this.plateService.addDefect(this.storage, this.comment).subscribe({
        next: (res: any) => {
            this.router.navigate(['/dashboard/']);
        },
        error: null,
        complete: () => {
        }
      });
    }
  }

}
