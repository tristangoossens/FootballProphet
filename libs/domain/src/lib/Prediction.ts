import mongoose, { ObjectId } from 'mongoose';
import { EntityBase } from './EntityBase';
import { HalfTimeScore } from './enum/HalfTimeScore';
import { Fixture } from './Fixture';

export interface Prediction extends EntityBase {
  fixture: mongoose.Types.ObjectId | Fixture;

  predictedHomeScore: number;
  predictedAwayScore: number;
  predictedHalfTimeScore: HalfTimeScore;
}
