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
import { Router, ActivatedRoute } from '@angular/router';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { StatusService } from 'src/app/services/status.service';
import { Status } from 'src/app/models/status';
import { User } from 'src/app/models/user';
import { getThisUser } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  order: Order = new Order();
  plates: Array<Plate>;
  statuses: Status[];
  fileName: string;
  orderID: string;
  statusID: string;
  formData: FormData;
  file: UploadFile;
  uploadInput: EventEmitter<UploadInput>;
  options: UploaderOptions;
  token: string;

  user: User;

  constructor(private plateService: PlateService,
              private messageService: MessageService,
              private fileUploaderService: FileUploaderService,
              private orderService: OrderService,
              private permissionGuard: PermissionGuard,
              private statusService: StatusService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store <any>) {
    this.plateService.list().subscribe((response) => {
      this.plates = response.plates;
    });
    this.options = { concurrency: 1, maxUploads: 3, maxFileSize: 1754429730 };
    this.uploadInput = new EventEmitter<UploadInput>();
    this.store.select(authState).subscribe((state) => {
        this.token = state.token;
    });
    this.store.select(userState).subscribe((state) => {
      this.user = state.user;
    });
    if (this.permissionGuard.showMenuItem('order user all')) {
      this.getStatuses();
    }
    this.getOrder();
    this.calculatePrice();
  }

  ngOnInit() {
  }
  getOrder(): void {
    this.orderID = this.route.snapshot.paramMap.get('id');
    this.orderService.edit(this.orderID).subscribe({
      next: (res: any) => {
        this.order = res.order;
        this.order.plateId = res.order.plate_id;
        this.statusID = this.order.status_id;
        this.order.file = res.file;
      },
      error: null,
      complete: () => {
      }
    });
  }


  getStatuses() {
    this.statusService.list().subscribe({
      next: (res: any) => {
        this.statuses = res.statuses;
      },
      error: null,
      complete: () => {
      }
    });
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: `${environment.backendUrl}/file/upload`,
        method: 'POST',
        data: { orderID: this.order.id.toString() },
        headers: {
          token: this.token
        }
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.file = output.file;
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
    } else if (output.type === 'cancelled' || output.type === 'removed') {
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
    } else if (output.type === 'done') {
      this.messageService.setMessage({message: output.file.response.message, messageType: output.file.response.status});
      this.file =  output.file;
      this.order.file = output.file.response.file;
      this.order.quantity = output.file.response.file.pages;
      this.calculatePrice();
    }
  }

  deleteFile(): void {
    this.fileUploaderService.deleteFile(this.order.file.id, this.order.id).subscribe({
      next: (response) => {
        if (response === true) {
          this.order.file = null;
        }
      },
      error: null,
      complete: () => {
      }
    });
  }

  calculatePrice() {
    if (this.order.file && this.order.plateId) {
      //console.log(this.order, this.user, this.plates);
      const selectedPlate = (this.user.pricing.length > 0)
        ? this.user.pricing.find(price => (price.plate_id == this.order.plateId)).price
        : this.plates.find(plate => (plate.id == this.order.plateId)).price;
      const selectedColors = [this.order.c, this.order.m, this.order.y, this.order.k, this.order.pantone]
        .reduce(( accumulator, currentValue ) => {
          return (currentValue === true || currentValue === 1) ? accumulator + 1 : accumulator;
        } , 0);
      //console.log(this.order.quantity, selectedColors, selectedPlate);
      this.order.price = (this.order.quantity * selectedColors * parseFloat(selectedPlate)).toString();
    }
  }

  onSubmit(f: NgForm): void {
    if (!this.order.file || !this.order.plateId || !this.order.editable ||
      (!this.order.c && !this.order.m && !this.order.y && !this.order.k && !this.order.pantone)) {
      return ;
    }
    this.orderService.update(this.order, this.order.file.id, this.statusID).subscribe({
      next: () => {
        this.store.dispatch(getThisUser({}));
        this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
          this.router.navigate(['dashboard/order']);
        });
      },
      error: null,
      complete: () => {
      }
    });
  }
}
