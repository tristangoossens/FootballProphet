import mongoose from 'mongoose';

export const PredictionSchema = new mongoose.Schema({
    fixture: { type: mongoose.Types.ObjectId, ref: 'fixtures', required: true },
    homeScore: { type: Number, required: true },
    awayScore: { type: Number, required: true },
    halfTimeScore: { type: String, required: true },
}, { timestamps: true })

