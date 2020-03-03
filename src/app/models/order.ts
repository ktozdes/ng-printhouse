import {File} from './file';
export class Order {
    id: number;

    all?: boolean;
    c: boolean;
    m: boolean;
    y: boolean;
    k: boolean;
    urgent: boolean;
    deliver: boolean;
    editable?: boolean;

    quantity: number;
    comment: string;
    price: string;

    address?: string;
    userId?: string;
    statusId?: string;
    plateId?: string;
    file?: File;
}
