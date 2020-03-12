import { Component, OnInit } from '@angular/core';
import { PlateService } from 'src/app/services/plate.service';
import { Router } from '@angular/router';
import { Plate } from 'src/app/models/plate';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {
  plates: Plate[];
  constructor(private plateService: PlateService,
              private router: Router) {
      this.list();
    }

  ngOnInit() {
  }

  list(): void {
    this.plateService.list().subscribe({
      next: (res: any) => {
        this.plates = res.plates;
      },
      error: null,
      complete: () => {
      }
    });
  }

  edit(id: any) {
    this.router.navigate(['/dashboard/storage/edit/', { id }]);
  }

  destroy(id: any) {
    if (confirm('Are you sure to delete?')) {
      this.plateService.destroy(id).subscribe({
        next: (res: any) => {
          this.list();
        }
      });
    }
  }

}
