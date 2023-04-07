import { League, Team } from '@footballprophet/domain';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { LeagueDocument } from './league.model';

@Injectable()
export class LeagueService {
  constructor(
    @InjectModel('leagues') private leagueModel: Model<LeagueDocument>
  ) {}

  // League methods
  async GetAll(): Promise<League[]> {
    return await this.leagueModel.find();
  }

  async GetById(id: mongoose.Types.ObjectId): Promise<League> {
    return await this.leagueModel.findById(id).populate('fixtures');
  }

  async Create(league: League) {
    await this.leagueModel.create(league);
  }

  async Update(id: mongoose.Types.ObjectId, league: League) {
    await this.leagueModel.findOneAndUpdate(
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
  }

  // Team method
  async AddTeamToLeague(leagueId: mongoose.Types.ObjectId, team: Team) {
    await this.leagueModel.findOneAndUpdate(
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
  }

  // Fixture reference methods
  async AddFixtureReference(
    leagueId: mongoose.Types.ObjectId,
    fixtureId: mongoose.Types.ObjectId
  ) {
    await this.leagueModel.findOneAndUpdate(
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
  }
}
