import { EntityBase } from "./EntityBase";
import { Position } from "./enum/Position";

export interface Player extends EntityBase {
    name: string;
    dateOfBirth: Date;
    nationality: string;
    position: Position;
    photoUrl: string;
    teamId: string | null;
}

