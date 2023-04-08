import { ObjectId } from "mongoose";
import { EntityBase } from "./EntityBase";
import { UserRole } from "./enum/UserRole";
import { Identity } from "./Identity";
import { Pool } from "./Pool";
import { Prediction } from "./Prediction";

export interface User extends EntityBase, Identity {
    birthDate: Date;
    phonenumber: string;
    avatarUrl: string;
    roles: UserRole[];
    pools?: ObjectId[] | Pool[];
    predictions?: Prediction[];
}