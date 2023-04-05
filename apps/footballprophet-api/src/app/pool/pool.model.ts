import { Pool } from '@footballprophet/domain';
import mongoose from 'mongoose';

export type PoolDocument = Pool & Document

export const PoolSchema = new mongoose.Schema({
    league: { type: mongoose.Schema.Types.ObjectId, ref: 'leagues', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    logoUrl: { type: String, required: true },
    isPrivate: { type: Boolean, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    joinCode: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }],
}, { timestamps: true })

export const PoolModel = mongoose.model<PoolDocument>('pools', PoolSchema);

