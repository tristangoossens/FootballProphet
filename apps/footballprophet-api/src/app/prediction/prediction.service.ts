import { Prediction, User, UserRole } from '@footballprophet/domain';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';
import { UserDocument } from '../user/user.model';

@Injectable()
export class PredictionService {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

  async CreatePrediction(userId: ObjectId, prediction: Prediction) {
    try {
      return await this.userModel.findOneAndUpdate(
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
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (PredictionService -> CreatePrediction): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async UpdatePrediction(
    userId: ObjectId,
    predictionId: ObjectId,
    prediction: Prediction
  ) {
    try {
      return await this.userModel.findOneAndUpdate(
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
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (PredictionService -> UpdatePrediction): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async DeletePrediction(userId: ObjectId, predictionId: ObjectId) {
    try {
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
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (PredictionService -> DeletePrediction): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
