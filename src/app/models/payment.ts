import { User } from './user';

export class Payment {
    id: string;
    name: string;
    amount?: string;
    balance_before?: string;
    balance_after?: string;
    comment?: string;

    user_id?: string;
    manager_id?: string;


    user?: User;
    manager?: User;
}
