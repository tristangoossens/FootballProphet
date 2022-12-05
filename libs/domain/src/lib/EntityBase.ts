import { Types } from 'mongoose';

export interface EntityBase {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}