import { EntityBase } from "./EntityBase";

export interface Player extends EntityBase {
    name: string;
    dateOfBirth: Date;
    nationality: string;
    position: Position;
    photoUrl: string;
}

export enum Position {
    GK = "Goalkeeper",
    DF = "Defender",
    MF = "Midfielder",
    FW = "Forward"
}