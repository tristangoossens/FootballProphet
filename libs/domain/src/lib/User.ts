import { EntityBase } from "./EntityBase";
import { UserRole } from "./enum/UserRole";
import { Identity } from "./Identity";

export interface User extends EntityBase, Identity {
    birthDate: Date;
    phonenumber: string;
    roles: UserRole[];
}