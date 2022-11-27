import { EntityBase } from "./EntityBase";
import { Position } from "./Position";

export interface Player extends EntityBase {
    name: string;
    dateOfBirth: Date;
    nationality: string;
    position: Position;
    photoUrl: string;
}

