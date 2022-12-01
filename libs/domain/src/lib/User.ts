import { EntityBase } from "./EntityBase";
import { UserRole } from "./enum/UserRole";

export interface User extends EntityBase {
    email: string;
    password: string | undefined;
    username: string;
    birthDate: Date;
    phonenumber: string;
    city: string;
    address: string;
    roles: UserRole[];
}