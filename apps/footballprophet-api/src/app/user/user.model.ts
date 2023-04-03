import { User } from '@footballprophet/domain';
import mongoose, { Document } from 'mongoose';
import { PredictionSchema } from '../prediction/prediction.model';

export type UserDocument = User & Document

export const UserSchema = new mongoose.Schema({
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true },
    phonenumber: { type: String, required: true },
    roles: { type: [String], required: true },
    predictions: { type: [PredictionSchema], required: false },
}, { timestamps: true })

export const UserModel = mongoose.model<UserDocument>('users', UserSchema);

