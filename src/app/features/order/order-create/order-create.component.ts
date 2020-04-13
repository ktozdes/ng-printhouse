import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UploadOutput, UploadInput, UploadFile, UploaderOptions } from 'ngx-uploader';

import { Order } from 'src/app/models/order';
import { PlateUser } from 'src/app/models/plate-user';
import { User } from 'src/app/models/user';
import { Plate } from 'src/app/models/plate';
import { Payment } from 'src/app/models/payment';
import { Storage } from 'src/app/models/storage';
import { File } from 'src/app/models/file';

import { PlateService } from 'src/app/services/plate.service';
import { MessageService } from 'src/app/services/message.service';
import { FileUploaderService } from 'src/app/services/file-uploader.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

import { authState, userState } from 'src/app/store/app-state';
import { getThisUser } from 'src/app/store/actions/user.actions';
import { PermissionGuard } from 'src/app/shared/guards/permission.guard';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  order: Order = new Order();
  plates: Array<Plate>;
  formData: FormData;
  file: UploadFile;
  fileMetaData: any;
  uploadInput: EventEmitter<UploadInput>;
  options: UploaderOptions;
  token: string;
  pricing: PlateUser[];
  user: User;
  users: Array<User>;

  @ViewChild('f', { static: true })userFrm: NgForm;

  constructor(private plateService: PlateService,
              private messageService: MessageService,
              private fileUploaderService: FileUploaderService,
              private orderService: OrderService,
              private userService: UserService,
              private router: Router,
              private permissionGuard: PermissionGuard,
              private store: Store <any>) {
    this.options = { concurrency: 1, maxUploads: 3, maxFileSize: 1754429730 };
    this.uploadInput = new EventEmitter<UploadInput>();
    this.store.select(authState).subscribe((state) => {
        this.token = state.token;
    });
    const getState = this.store.select(userState);
    getState.subscribe((state) => {
      this.user = state.user;
      this.order.address = state.user.address;
      this.order.c = true;
      this.order.m = true;
      this.order.y = true;
      this.order.k = true;
      this.order.pantone = false;
      this.order.storage = new Storage();
      this.order.payment = new Payment();
      this.order.file = new File();

      const defaultPlateID = localStorage.getItem('default_plate_id');
      if (defaultPlateID) {
        this.order.storage.plate_id = parseInt(defaultPlateID, 10);
      }
    });
    this.getPlates();
    if (this.permissionGuard.showMenuItem('order user all')){
      this.getUsers();
    }
  }

  ngOnInit() {
  }

  getPlates() {
    this.plateService.list().subscribe({
      next: (res: any) => {
        this.plates = res.plates;
        this.pricing = this.plates.map(plate => {
          const userPrice = this.user.pricing.find(price => (price.plate_id == plate.id));
          plate.price = (userPrice) ? userPrice.price : plate.price;
          return {
            id: plate.id,
            name: plate.name,
            price: plate.price
          };
        });
      },
      error: null,
      complete: () => {
      }
    });
  }

  getUsers() {
    this.userService.list().subscribe({
      next: (res: any) => {
        this.users = res.users;
      },
      error: null,
      complete: () => {
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.userFrm.dirty && !this.userFrm.submitted) {
      const result = window.confirm('Вы точно хотите не создавать заказ?');
      if (this.order.file.id && result) {
        this.deleteFile();
      }
      return result;
    }
    return true;
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
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
    } else if (output.type === 'cancelled' || output.type === 'removed') {
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
    } else if (output.type === 'done') {
      this.messageService.setMessage({message: output.file.response.message, messageType: output.file.response.status});
      this.file =  output.file.response.file;
      this.order.file.pages = output.file.response.file.pages;
      this.order.file.id = output.file.response.file.id;
      this.calculatePrice();
    }
  }

  deleteFile(): void {
    this.fileUploaderService.deleteFile(this.order.file.id).subscribe({
      next: null,
      error: null,
      complete: () => {
        this.file = null;
        this.order.file = new File();
      }
    });
  }

  calculatePrice() {
    if (this.file && this.order.storage.plate_id) {
      const platePrice = (this.user.pricing.length > 0)
        ? this.user.pricing.find(price => (price.plate_id == this.order.storage.plate_id)).price
        : this.plates.find(plate => (plate.id == this.order.storage.plate_id)).price;
      const selectedColors = [this.order.c, this.order.m, this.order.y, this.order.k, this.order.pantone]
        .reduce(( accumulator, currentValue ) => {
          return (currentValue === true ) ? accumulator + 1 : accumulator;
        } , 0);
      this.order.payment.amount = (this.order.file.pages * selectedColors * parseFloat(platePrice)).toString();
    }
  }

  onSubmit(f: NgForm): void {
    if (!this.order.file.id || !this.order.storage.plate_id ||
      (!this.order.c && !this.order.m && !this.order.y && !this.order.k && !this.order.pantone)) {
      console.log('no submit');
      return ;
    }
    localStorage.setItem('default_plate_id', this.order.storage.plate_id.toString() );
    this.orderService.store(this.order, this.order.file.id).subscribe({
      next: () => {
        this.store.dispatch(getThisUser({}));
        this.router.navigate(['/dashboard/order/']);
      },
      error: null,
      complete: () => {
      }
    });
  }
}
