import { League } from '@footballprophet/domain';
import mongoose, { Document } from 'mongoose';
import { TeamSchema } from '../team/team.model';

export type LeagueDocument = League & Document

export const LeagueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    season: { type: Number, required: true },
    teams: { type: [TeamSchema], required: false},
}, { timestamps: true })

export const LeagueModel = mongoose.model<LeagueDocument>('leagues', LeagueSchema);
