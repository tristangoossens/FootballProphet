import { Fixture } from '@footballprophet/domain';
import mongoose, { Document } from 'mongoose';
import { TeamSchema } from '../team/team.model';

export type FixtureDocument = Fixture & Document

export const FixtureSchema = new mongoose.Schema({
    referee: { type: String, required: true },
    stadium: { type: String, required: true },
    kickOffDate: { type: Number, required: true },
    homeTeam: { type: TeamSchema, required: true },
    awayTeam: { type: TeamSchema, required: true },
    homeTeamScore: { type: Number, required: false },
    awayTeamScore: { type: Number, required: false },
}, { timestamps: true })

export const FixtureModel = mongoose.model<FixtureDocument>('fixtures', FixtureSchema);
