import { User } from '@footballprophet/domain';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document

export const UserSchema = new mongoose.Schema({
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true },
    phonenumber: { type: String, required: true },
    role: { type: [String], required: true },
}, { timestamps: true })

export const UserModel = mongoose.model<UserDocument>('users', UserSchema);

