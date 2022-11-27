import { EntityBase } from "./EntityBase";

export interface Team extends EntityBase {
    name: string;
    logoUrl: string;
    foundedIn: Date;
}