import { ObjectId } from 'mongoose';

export interface EntityBase {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
