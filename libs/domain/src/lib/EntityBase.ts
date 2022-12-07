import { Types } from 'mongoose';

export interface EntityBase {
    _id: string | undefined;
    createdAt: Date;
    updatedAt: Date;
}