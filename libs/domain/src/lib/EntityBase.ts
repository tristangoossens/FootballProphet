import { ObjectId } from 'mongoose';

export interface EntityBase {
    _id: ObjectId | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}