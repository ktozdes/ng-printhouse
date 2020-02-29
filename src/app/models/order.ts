export class Order {
    id: string;

    c: boolean;
    m: boolean;
    y: boolean;
    k: boolean;
    urgent: boolean;
    deliver: boolean;

    quantity: number;
    comment: string;
    price: string;

    userId?: string;
    statusId?: string;
    plateId?: string;
}
