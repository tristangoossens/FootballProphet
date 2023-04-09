import { Pool } from '@footballprophet/domain';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { PoolDocument } from './pool.model';

@Injectable()
export class PoolService {
  constructor(@InjectModel('pools') private poolModel: Model<PoolDocument>) {}

  async GetAll(userId?: ObjectId) {
    return await this.poolModel.find();
  }

  async GetById(id: ObjectId) {
    return await this.poolModel
      .findById(id)
      .populate('members')
      .populate('owner')
      .populate('league');
  }

  async GetScoreBoard(id: string): Promise<any[]> {
    return await this.poolModel
      .aggregate([
        {
          // Find the Pool's document
          $match: {
            $expr: {
              $eq: ['$_id', mongoose.Types.ObjectId.createFromHexString(id)],
            },
          },
        },
        {
          // Join pool members
          $lookup: {
            from: 'users',
            localField: 'members',
            foreignField: '_id',
            as: 'members',
          },
        },
        {
          // Unwind document for each user
          $unwind: {
            path: '$members',
          },
        },
        {
          // Unwind document for each user's predictions
          $unwind: {
            path: '$members.predictions',
          },
        },
        {
          // Lookup related fixture to prediction
          $lookup: {
            from: 'fixtures',
            let: {
              fixtureId: '$members.predictions.fixture',
              poolLeague: '$league',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: [
                          '$_id',
                          {
                            $toObjectId: '$$fixtureId',
                          },
                        ],
                      },
                      {
                        $eq: [
                          '$league',
                          {
                            $toObjectId: '$$poolLeague',
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            as: 'members.predictions.fixture',
          },
        },
        {
          // Unwind fixture (always one element)
          $unwind: {
            path: '$members.predictions.fixture',
          },
        },
        {
          // Check if the fixture has been scored
          $match: {
            $and: [
              {
                'members.predictions.fixture.actualHalfTimeScore': {
                  $exists: true,
                },
              },
              {
                'members.predictions.fixture.actualHomeScore': {
                  $exists: true,
                },
              },
              {
                'members.predictions.fixture.actualAwayScore': {
                  $exists: true,
                },
              },
            ],
          },
        },
        {
          // Points calculation
          $addFields: {
            'members.predictions.points': {
              $sum: [
                {
                  $cond: [
                    {
                      $eq: [
                        '$members.predictions.fixture.actualHalfTimeScore',
                        '$members.predictions.predictedHalfTimeScore',
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
                                '$members.predictions.fixture.actualHomeScore',
                                '$members.predictions.fixture.actualAwayScore',
                              ],
                            },
                            'Home',
                            {
                              $cond: [
                                {
                                  $eq: [
                                    '$members.predictions.fixture.actualHomeScore',
                                    '$members.predictions.fixture.actualAwayScore',
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
                                '$members.predictions.predictedHomeScore',
                                '$members.predictions.predictedAwayScore',
                              ],
                            },
                            'Home',
                            {
                              $cond: [
                                {
                                  $eq: [
                                    '$members.predictions.predictedHomeScore',
                                    '$members.predictions.predictedAwayScore',
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
                            '$members.predictions.fixture.actualHomeScore',
                            '$members.predictions.predictedHomeScore',
                          ],
                        },
                        {
                          $eq: [
                            '$members.predictions.fixture.actualAwayScore',
                            '$members.predictions.predictedAwayScore',
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
              poolId: '$_id',
              memberId: '$members._id',
            },
            predictions: {
              $push: '$members.predictions',
            },
            totalPoints: {
              $sum: '$members.predictions.points',
            },
          },
        },
        {
          // Populate user reference
          $lookup: {
            from: 'users',
            localField: '_id.memberId',
            foreignField: '_id',
            as: 'members',
          },
        },
        {
          $unwind: '$members',
        },
        {
          $project: {
            _id: 0,
            member: '$members',
            predictions: 1,
            totalPoints: 1,
          },
        },
      ])
      .exec();
  }

  async Create(pool: Pool) {
    return await this.poolModel.create(pool);
  }

  async Update(id: string, pool: Pool) {
    return await this.poolModel
      .updateOne(
        // Filter
        {
          _id: mongoose.Types.ObjectId.createFromHexString(id),
        },

        // Update pool values (name, description, logoUrl, isPrivate)
        {
          $set: {
            name: pool.name,
            description: pool.description,
            logoUrl: pool.logoUrl,
            isPrivate: pool.isPrivate,
          },
        }
      )
      .exec();
  }

  async Join(id: ObjectId, userId: ObjectId) {
    return await this.poolModel.findByIdAndUpdate(
      // Filter
      {
        _id: id,
      },
      // Add user to members array
      {
        $addToSet: {
          members: userId,
        },
      }
    );
  }

  async Leave(id: ObjectId, userId: ObjectId) {
    return await this.poolModel.findByIdAndUpdate(
      // Filter
      {
        _id: id,
      },
      // Remove user from members array
      {
        $pull: {
          members: userId,
        },
      }
    );
  }
}
