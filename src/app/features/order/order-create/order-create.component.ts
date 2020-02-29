import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { PlateService } from 'src/app/services/plate.service';
import { Plate } from 'src/app/models/plate';
import { environment } from 'src/environments/environment';

import { UploadOutput, UploadInput, UploadFile, UploaderOptions } from 'ngx-uploader';
import { Store } from '@ngrx/store';
import { authState } from 'src/app/store/app-state';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  order: Order = new Order();
  plates: Array<Plate>;
  infoMessage: any;
  fileName: string;

  formData: FormData;
  file: UploadFile;
  uploadInput: EventEmitter<UploadInput>;
  options: UploaderOptions;
  token: string;
  constructor(private plateService: PlateService,
              private store: Store <any>) {
    this.plateService.list().subscribe((response) => {
      this.plates = response.plates;
    });
    this.options = { concurrency: 1, maxUploads: 3, maxFileSize: 1754429730 };
    this.uploadInput = new EventEmitter<UploadInput>();
    this.store.select(authState).subscribe((state) => {
        this.token = state.token;
    });
  }

  ngOnInit() {
  }

  onUploadOutput(output: UploadOutput): void {
    console.log('file', this.file, output);
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.backendUrl}/file/upload`,
        method: 'POST',
        headers: {
          token: this.token
        }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.file = output.file;
      this.fileName = this.file.name;
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      this.file = output.file;
    } else if (output.type === 'done') {
    } else if (output.type === 'cancelled' || output.type === 'removed') {
      this.file =  output.file;
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      console.log(output.file.name + ' rejected');
    }
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

}
