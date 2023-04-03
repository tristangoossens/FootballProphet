import { ObjectId } from "mongoose";
import { League } from "./League";
import { User } from "./User";

export interface Pool {
    league: ObjectId | League;
    name: string;
    description: string;
    logoUrl: string;
    isPrivate: boolean;
    owner: ObjectId | User;
    members: ObjectId[] | User[];
}