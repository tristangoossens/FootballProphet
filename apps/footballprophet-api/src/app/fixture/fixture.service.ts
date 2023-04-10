import { Team, Fixture } from '@footballprophet/domain';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { FixtureDocument } from './fixture.model';

@Injectable()
export class FixtureService {
  constructor(
    @InjectModel('fixtures') private fixtureModel: Model<FixtureDocument>
  ) {}

  async GetById(id: mongoose.Types.ObjectId) {
    try {
      const fixture = await this.fixtureModel.findById(id);
      if (!fixture)
        throw new HttpException('Fixture not found', HttpStatus.NOT_FOUND);
      return fixture;
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (FixtureService -> GetById): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async Create(fixtureToInsert: Fixture) {
    try {
      return await this.fixtureModel.create(fixtureToInsert);
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (FixtureService -> Create): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async Update(id: mongoose.Types.ObjectId, fixture: Fixture) {
    try {
      return await this.fixtureModel.findOneAndUpdate(
        // Filter
        {
          _id: id,
        },
        // Score to set
        {
          $set: {
            actualAwayScore: fixture.actualAwayScore,
            actualHomeScore: fixture.actualHomeScore,
            actualHalfTimeScore: fixture.actualHalfTimeScore,
          },
        }
      );
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (FixtureService -> Update): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
