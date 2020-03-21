import {File} from './file';
import { Payment } from './payment';
import { Storage } from './storage';
import { Status } from './status';
import { User } from './user';
export class Order {
  [x: string]: any;
    id: number;

    all?: boolean;
    c: any;
    m: any;
    y: any;
    k: any;
    pantone: any;
    urgent: boolean;
    deliver: boolean;
    comment?: string;
    address?: string;
    editable?: boolean;


    // file_id?: number;
    status_id?: number;
    // user_id?: number;
    // manager_id?: number;
    // payment_id?: number;
    // storage_id?: number;
    // plate_id?: number;

    file?: File;
    status?: Status;
    user?: User;
    manager?: User;
    payment?: Payment;
    storage: Storage;
}
