import { Team, Fixture } from '@footballprophet/domain';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { FixtureDocument } from './fixture.model';

@Injectable()
export class FixtureService {
  constructor(
    @InjectModel('fixtures') private fixtureModel: Model<FixtureDocument>
  ) { }

  async Create(fixture: Fixture) {
    return await this.fixtureModel.create(fixture);
  }

  async Update(id: mongoose.Types.ObjectId, fixture: Fixture) {
    await this.fixtureModel.findOneAndUpdate(
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
  }
}
