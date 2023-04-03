import { ObjectId } from "mongoose";
import { EntityBase } from "./EntityBase";
import { HalfTimeScore } from "./enum/HalfTimeScore";
import { Fixture } from "./Fixture";

export interface Prediction extends EntityBase {
    fixture: ObjectId | Fixture;
    homeScore: number;
    awayScore: number;
    halfTimeScore: HalfTimeScore;
}