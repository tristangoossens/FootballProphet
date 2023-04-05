import { ObjectId } from "mongoose";
import { League } from "./League";
import { User } from "./User";

export interface Pool {
    league: ObjectId | League;
    name: string;
    description: string;
    logoUrl: string;
    isPrivate: boolean;
    members: ObjectId[] | User[];

    // Pool owner
    owner: ObjectId | User;
    joinCode?: string;
}