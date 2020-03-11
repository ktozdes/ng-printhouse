import { PlateUser } from './plate-user';

export class User {
    id: string;
    name: string;
    fullname?: string;
    company?: string;
    phone1?: string;
    phone2?: string;
    address?: string;
    balance: string;
    rank: string;
    trust: string;
    comment?: string;
    active?: string;
    email: string;
    emailVerifiedAt?: any;
    token: string;
    password: string;
    repeatPassword: string;
    roles?: string[];
    permissions?: string[];
    pricing: PlateUser[];
}
