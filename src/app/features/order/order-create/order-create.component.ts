import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { PlateService } from 'src/app/services/plate.service';
import { Plate } from 'src/app/models/plate';
import { environment } from 'src/environments/environment';

import { UploadOutput, UploadInput, UploadFile, UploaderOptions } from 'ngx-uploader';
import { Store } from '@ngrx/store';
import { authState, userState } from 'src/app/store/app-state';
import { MessageService } from 'src/app/services/message.service';
import { FileUploaderService } from 'src/app/services/file-uploader.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  order: Order = new Order();
  plates: Array<Plate>;
  fileName: string;
  fileId: number;
  formData: FormData;
  file: UploadFile;
  uploadInput: EventEmitter<UploadInput>;
  options: UploaderOptions;
  token: string;
  constructor(private plateService: PlateService,
              private messageService: MessageService,
              private fileUploaderService: FileUploaderService,
              private orderService: OrderService,
              private router: Router,
              private store: Store <any>) {
    this.plateService.list().subscribe((response) => {
      this.plates = response.plates;
    });
    this.options = { concurrency: 1, maxUploads: 3, maxFileSize: 1754429730 };
    this.uploadInput = new EventEmitter<UploadInput>();
    this.store.select(authState).subscribe((state) => {
        this.token = state.token;
    });
    const getState = this.store.select(userState);
    getState.subscribe((state) => {
      this.order.address = state.user.address;
    });

  }

  ngOnInit() {
  }

  onUploadOutput(output: UploadOutput): void {
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
    } else if (output.type === 'cancelled' || output.type === 'removed') {
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
    } else if (output.type === 'done') {
      this.messageService.setMessage({message: output.file.response.message, messageType: output.file.response.status});
      this.file =  output.file;
      this.fileId = output.file.response.file_id;
    }
  }

  deleteFile(): void {
    this.fileUploaderService.deleteFile(this.fileId).subscribe({
      next: null,
      error: null,
      complete: () => {
        this.fileId = null;
        this.file = null;
        this.fileName = null;
      }
    });
  }

  onAllColorChange(f: NgForm) {
    if (this.order.all === true) {
      this.order.c = true;
      this.order.m = true;
      this.order.y = true;
      this.order.k = true;
    }
  }

  onSubmit(f: NgForm): void {
    if (!this.fileId || !this.order.plateId ||
      (!this.order.c && !this.order.m && !this.order.y && !this.order.k)) {
      console.log('no submit');
      return ;
    }
    this.orderService.store(this.order, this.fileId).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/order/']);
      },
      error: null,
      complete: () => {
      }
    });
  }
}
