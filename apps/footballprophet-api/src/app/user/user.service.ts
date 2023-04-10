import { User, UserRole } from '@footballprophet/domain';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { UserDocument, UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

  async findByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.userModel
        .findOne({ username: username })
        .populate('pools');

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      return user;
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (UserService -> findByUsername): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async find(id: ObjectId): Promise<any | null> {
    try {
      const user = await this.userModel
        .findById(id)
        .select('-password')
        .populate('pools')
        .populate('predictions.fixture');

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      return user;
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (UserService -> find): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async scores(id: string): Promise<User[] | null> {
    try {
      return await this.userModel.aggregate([
        {
          // Find the users's document
          $match: {
            $expr: {
              $eq: ['$_id', mongoose.Types.ObjectId.createFromHexString(id)],
            },
          },
        },
        {
          // Unwind document for each user's predictions
          $unwind: {
            path: '$predictions',
          },
        },
        {
          // Lookup related fixture to prediction
          $lookup: {
            from: 'fixtures',
            localField: 'predictions.fixture',
            foreignField: '_id',
            as: 'predictions.fixture',
          },
        },
        {
          // Unwind fixture (always one element)
          $unwind: {
            path: '$predictions.fixture',
          },
        },
        {
          $lookup: {
            from: 'leagues',
            localField: 'predictions.fixture.league',
            foreignField: '_id',
            as: 'league',
          },
        },
        {
          // Check if the fixture has been scored
          $match: {
            $and: [
              {
                'predictions.fixture.actualHalfTimeScore': {
                  $exists: true,
                },
              },
              {
                'predictions.fixture.actualHomeScore': {
                  $exists: true,
                },
              },
              {
                'predictions.fixture.actualAwayScore': {
                  $exists: true,
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$league',
          },
        },
        {
          // Points calculation
          $addFields: {
            'predictions.points': {
              $sum: [
                {
                  $cond: [
                    {
                      $eq: [
                        '$predictions.fixture.actualHalfTimeScore',
                        '$predictions.predictedHalfTimeScore',
                      ],
                    },
                    3,
                    // Correct half time score
                    0, // Incorrect half time score
                  ],
                },
                {
                  $cond: [
                    {
                      $eq: [
                        {
                          $cond: [
                            {
                              $gt: [
                                '$predictions.fixture.actualHomeScore',
                                '$predictions.fixture.actualAwayScore',
                              ],
                            },
                            'Home',
                            {
                              $cond: [
                                {
                                  $eq: [
                                    '$predictions.fixture.actualHomeScore',
                                    '$predictions.fixture.actualAwayScore',
                                  ],
                                },
                                'Tied',
                                'Away',
                              ],
                            },
                          ],
                        },
                        {
                          $cond: [
                            {
                              $gt: [
                                '$predictions.predictedHomeScore',
                                '$predictions.predictedAwayScore',
                              ],
                            },
                            'Home',
                            {
                              $cond: [
                                {
                                  $eq: [
                                    '$predictions.predictedHomeScore',
                                    '$predictions.predictedAwayScore',
                                  ],
                                },
                                'Tied',
                                'Away',
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    3,
                    // Correct winner
                    0, // Incorrect winner
                  ],
                },
                {
                  $cond: [
                    {
                      $and: [
                        {
                          $eq: [
                            '$predictions.fixture.actualHomeScore',
                            '$predictions.predictedHomeScore',
                          ],
                        },
                        {
                          $eq: [
                            '$predictions.fixture.actualAwayScore',
                            '$predictions.predictedAwayScore',
                          ],
                        },
                      ],
                    },
                    5,
                    // Correct final score
                    0, // Incorect final score
                  ],
                },
              ],
            },
          },
        },
        {
          // Group per user
          $group: {
            _id: {
              user: '$_id',
              league: '$league',
            },
            totalPoints: {
              $sum: '$predictions.points',
            },
          },
        },
      ]);
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (UserService -> scores): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async create(user: User) {
    try {
      return await this.userModel.create(user);
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (UserService -> create): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Pool reference methods
  async addPool(
    userId: mongoose.Types.ObjectId,
    poolId: mongoose.Types.ObjectId
  ) {
    try {
      return await this.userModel.findOneAndUpdate(
        { _id: userId },
        { $push: { pools: poolId } }
      );
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (UserService -> addPool): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removePool(
    userId: mongoose.Types.ObjectId,
    poolId: mongoose.Types.ObjectId
  ) {
    try {
      return await this.userModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { pools: poolId } }
      );
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (UserService -> removePool): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
