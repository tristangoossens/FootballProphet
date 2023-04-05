import mongoose from 'mongoose';

export const PredictionSchema = new mongoose.Schema(
  {
    fixture: { type: mongoose.Types.ObjectId, ref: 'fixtures', required: true },
    predictedHomeScore: { type: Number, required: true },
    predictedAwayScore: { type: Number, required: true },
    predictedHalfTimeScore: { type: String, required: true },
  },
  { timestamps: true }
);
