import { Team } from '@footballprophet/domain';
import mongoose, { Document } from 'mongoose';

export type TeamDocument = Team & Document

export const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    foundedIn: { type: Date, required: true },
}, { timestamps: true })

export const LeagueModel = mongoose.model<TeamDocument>('teams', TeamSchema);