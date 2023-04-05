import { Fixture } from '@footballprophet/domain';
import mongoose, { Document } from 'mongoose';
import { TeamSchema } from '../team/team.model';

export type FixtureDocument = Fixture & Document;

export const FixtureSchema = new mongoose.Schema(
  {
    league: { type: mongoose.Types.ObjectId, ref: 'leagues', required: true },
    referee: { type: String, required: true },
    stadium: { type: String, required: true },
    kickOffDate: { type: Date, required: true },
    homeTeam: { type: TeamSchema, required: true },
    awayTeam: { type: TeamSchema, required: true },
    actualHomeScore: { type: Number, required: false },
    actualAwayScore: { type: Number, required: false },
    actualHalfTimeScore: { type: String, required: false },
  },
  { timestamps: true }
);

export const FixtureModel = mongoose.model<FixtureDocument>(
  'fixtures',
  FixtureSchema
);
