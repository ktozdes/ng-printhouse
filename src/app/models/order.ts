import {File} from './file';
export class Order {
    id: number;

    all?: boolean;
    c: any;
    m: any;
    y: any;
    k: any;
    pantone: any;
    urgent: boolean;
    deliver: boolean;
    editable?: boolean;

    quantity: number;
    comment: string;
    price: string;

    address?: string;
    userId?: string;
    statusId?: string;
    status_id?: string;
    plateId?: string;
    file?: File;
    file_name?: string;
}
