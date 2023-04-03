import { ObjectId } from "mongoose";
import { EntityBase } from "./EntityBase";
import { League } from "./League";
import { Team } from "./Team";

export interface Fixture extends EntityBase {
    referee: string;
    stadium: string;
    kickOffDate: Date;
    homeTeam: Team;
    awayTeam: Team;
    league: ObjectId | League;
}