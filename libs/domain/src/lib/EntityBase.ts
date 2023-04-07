import mongoose, { ObjectId } from 'mongoose';

export interface EntityBase {
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
