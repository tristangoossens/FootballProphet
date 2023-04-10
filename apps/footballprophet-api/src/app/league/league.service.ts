import { League, Team } from '@footballprophet/domain';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { LeagueDocument } from './league.model';

@Injectable()
export class LeagueService {
  constructor(
    @InjectModel('leagues') private leagueModel: Model<LeagueDocument>
  ) {}

  // League methods
  async GetAll(limit: number = 5, offset: number = 0): Promise<League[]> {
    try {
      return await this.leagueModel.find().limit(limit).skip(offset);
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (LeagueService -> GetAll): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async GetById(id: mongoose.Types.ObjectId): Promise<League> {
    try {
      const league = await this.leagueModel.findById(id).populate('fixtures');
      if (!league)
        throw new HttpException('League not found', HttpStatus.NOT_FOUND);
      return league;
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (LeagueService -> GetAll): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async Create(league: League) {
    try {
      return await this.leagueModel.create(league);
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (LeagueService -> Create): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async Update(id: mongoose.Types.ObjectId, league: League) {
    try {
      return await this.leagueModel.findOneAndUpdate(
        // Filter
        {
          _id: id,
        },
        // Update (league attributes)
        {
          $set: {
            name: league.name,
            logoUrl: league.logoUrl,
            season: league.season,
          },
        }
      );
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (LeagueService -> Update): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Team method
  async AddTeamToLeague(leagueId: mongoose.Types.ObjectId, team: Team) {
    try {
      return await this.leagueModel.findOneAndUpdate(
        // Filter
        {
          _id: leagueId,
        },
        // Team to add
        {
          $push: {
            teams: team,
          },
        }
      );
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (LeagueService -> AddTeamToLeague): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Fixture reference methods
  async AddFixtureReference(
    leagueId: mongoose.Types.ObjectId,
    fixtureId: mongoose.Types.ObjectId
  ) {
    try {
      return await this.leagueModel.findOneAndUpdate(
        // Filter
        {
          _id: leagueId,
        },
        // Update
        {
          $push: {
            fixtures: fixtureId,
          },
        }
      );
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (LeagueService -> AddFixtureReference): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
