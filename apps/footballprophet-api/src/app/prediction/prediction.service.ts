import { Prediction, User, UserRole } from '@footballprophet/domain';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';
import { UserDocument } from '../user/user.model';

@Injectable()
export class PredictionService {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

  async CreatePrediction(userId: ObjectId, prediction: Prediction) {
    // TODO: Check if prediction is made one hour before kickoff

    await this.userModel.findOneAndUpdate(
      // Filter
      {
        _id: userId,
      },
      // Prediction to insert
      {
        $push: {
          predictions: prediction,
        },
      }
    );
  }

  async UpdatePrediction(
    userId: ObjectId,
    predictionId: ObjectId,
    prediction: Prediction
  ) {
    // TODO: Check if prediction is updated one hour before kickoff

    await this.userModel.findOneAndUpdate(
      // Filter
      {
        _id: userId,
        'predictions._id': predictionId,
      },
      // Prediction to Update (score fields)
      {
        $set: {
          'predictions.$.homeScore': prediction.predictedHomeScore,
          'predictions.$.awayScore': prediction.predictedAwayScore,
          'predictions.$.halfTimeScore': prediction.predictedHalfTimeScore,
        },
      }
    );
  }

  async DeletePrediction(userId: ObjectId, predictionId: ObjectId) {
    await this.userModel.findOneAndUpdate(
      // Filter
      {
        _id: userId,
      },
      // Prediction to delete
      {
        $pull: {
          predictions: {
            _id: predictionId,
          },
        },
      }
    );
  }
}
