import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plate } from 'src/app/models/plate';
import { Storage } from 'src/app/models/storage';
import { PlateService } from 'src/app/services/plate.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-storage',
  templateUrl: './edit-storage.component.html',
  styleUrls: ['./edit-storage.component.scss']
})
export class EditStorageComponent implements OnInit {
  plate: Plate = new Plate();
  storage: Storage = new Storage();
  plateID: string;
  formData: FormData;
  constructor(private plateService: PlateService,
              private router: Router,
              private route: ActivatedRoute) {
    this.getPlate();
  }

  ngOnInit() {
  }

  getPlate(): void {
    this.plateID = this.route.snapshot.paramMap.get('id');
    this.plateService.edit(this.plateID).subscribe({
      next: (res: any) => {
        this.plate = res.plate;
        console.log('plate', this.plate);
      },
      error: null,
      complete: () => {
      }
    });
  }

  onSubmit(f: NgForm): void {
    if (!this.plate.name) {
      console.log('no submit');
      return;
    }
    this.plateService.update(this.plate, this.storage).subscribe({
      next: (res: any) => {
        this.router.navigate(['/dashboard/order/']);
      },
      error: null,
      complete: () => {
      }
    });
  }

}
