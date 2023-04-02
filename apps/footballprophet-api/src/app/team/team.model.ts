import { Team } from '@footballprophet/domain';
import mongoose, { Document } from 'mongoose';

export type TeamDocument = Team & Document

export const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    foundedIn: { type: Date, required: true },
});