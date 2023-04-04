import { ObjectId } from "mongoose";
import { EntityBase } from "./EntityBase";
import { UserRole } from "./enum/UserRole";
import { Identity } from "./Identity";
import { Pool } from "./Pool";

export interface User extends EntityBase, Identity {
    birthDate: Date;
    phonenumber: string;
    avatarUrl: string;
    roles: UserRole[];
    pools?: ObjectId[] | Pool[];
}