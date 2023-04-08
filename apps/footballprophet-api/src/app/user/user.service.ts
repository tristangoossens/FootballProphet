import { User, UserRole } from '@footballprophet/domain';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { UserDocument, UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<UserDocument>) { }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username: username }).lean();
  }

  async find(id: ObjectId): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  async dashboard(id: ObjectId): Promise<User[] | null> {
    return await this.userModel.aggregate([
      {
        // First get the user with the given id
        $match: {
          _id: id,
        },
      },
      {
        // Then join the fixtures collection
        $unwind: {
          path: '$predictions',
        },
      },
      {
        // Unwind the fixtures array
        $lookup: {
          from: 'fixtures',
          localField: 'predictions.fixture',
          foreignField: '_id',
          as: 'fixture',
        },
      },
      {
        $addFields: {
          fixture: {
            $arrayElemAt: ['$fixture', 0],
          },
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          roles: 1,
          pools: 1,
          predictions: 1,
          'predictions.points': {
            $sum: [
              {
                $cond: [
                  {
                    $eq: [
                      '$fixture.actualHalfTimeScore',
                      '$predictions.predictedHalfTimeScore',
                    ],
                  },
                  3, // Correct half time score
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
                              '$fixture.actualHomeScore',
                              '$fixture.actualAwayScore',
                            ],
                          },
                          'Home',
                          {
                            $cond: [
                              {
                                $eq: [
                                  '$fixture.actualHomeScore',
                                  '$fixture.actualAwayScore',
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
                  3, // Correct winner
                  0, // Incorrect winner
                ],
              },
              {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          '$fixture.actualHomeScore',
                          '$predictions.predictedHomeScore',
                        ],
                      },
                      {
                        $eq: [
                          '$fixture.actualAwayScore',
                          '$predictions.actualAwayScore',
                        ],
                      },
                    ],
                  },
                  5, // Correct final score
                  0, // Incorect final score
                ],
              },
            ],
          },
        },
      },
    ]);
  }

  async create(user: User) {
    // TODO: Hash password
    await this.userModel.create(user);
  }

  // Pool reference methods
  async addPool(
    userId: mongoose.Types.ObjectId,
    poolId: mongoose.Types.ObjectId
  ) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { pools: poolId } }
    );
  }

  async removePool(
    userId: mongoose.Types.ObjectId,
    poolId: mongoose.Types.ObjectId
  ) {
    // TODO: A owner of a pool should not be able to remove himself from the pool
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { pools: poolId } }
    );
  }
}
