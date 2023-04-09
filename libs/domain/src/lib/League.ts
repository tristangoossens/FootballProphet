import { ObjectId } from "mongoose";
import { EntityBase } from "./EntityBase";
import { Fixture } from "./Fixture";
import { Team } from "./Team";

export interface League extends EntityBase {
    name: string;
    logoUrl: string;
    season: number;
    teams?: Team[];
    fixtures?: ObjectId[] | Fixture[];
}