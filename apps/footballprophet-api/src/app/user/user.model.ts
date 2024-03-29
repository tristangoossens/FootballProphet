import { User } from '@footballprophet/domain';
import mongoose, { Document } from 'mongoose';
import { PredictionSchema } from '../prediction/prediction.model';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

export const UserSchema = new mongoose.Schema(
  {
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true },
    avatarUrl: { type: String, required: true },
    phonenumber: { type: String, required: true },
    roles: [{ type: String, required: true }],
    predictions: { type: [PredictionSchema], required: false },
    pools: [{ type: mongoose.Types.ObjectId, required: false, ref: 'pools' }],
  },
  { timestamps: true }
);

// Password hashing hook
UserSchema.pre<User>('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;

    return next();
  } catch (err) {
    return next(err);
  }
});

export const UserModel = mongoose.model<UserDocument>('users', UserSchema);
