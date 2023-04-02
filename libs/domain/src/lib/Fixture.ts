import { EntityBase } from "./EntityBase";
import { Team } from "./Team";

export interface Fixture extends EntityBase {
    referee: string;
    stadium: string;
    kickOffDate: Date;
    homeTeam: Team;
    awayTeam: Team;
}