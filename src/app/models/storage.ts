import {Plate} from './plate';
import { User } from './user';
export class Storage {
    id?: number;
    name?: string;
    price?: string;
    quantity?: number;
    quantity_before?: number;
    quantity_after?: number;


    user_id?: number;
    plate_id?: number;
    manager_id?: number;

    plate?: Plate;
    user?: User;
    manager?: User;
}
