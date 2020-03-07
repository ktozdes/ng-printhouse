import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plate } from 'src/app/models/plate';
import { Storage } from 'src/app/models/storage';
import { PlateService } from 'src/app/services/plate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-storage',
  templateUrl: './create-storage.component.html',
  styleUrls: ['./create-storage.component.scss']
})
export class CreateStorageComponent implements OnInit {
  plate: Plate = new Plate();
  storage: Storage = new Storage();
  formData: FormData;
  constructor(private plateService: PlateService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(f: NgForm): void {
    if (!this.plate.name) {
      console.log('no submit');
      return ;
    }
    this.plateService.store(this.plate, this.storage).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/storage']);
      },
      error: null,
      complete: () => {
      }
    });
  }

}
