import { Team, Fixture } from "@footballprophet/domain";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FixtureDocument } from "./fixture.model";

@Injectable()
export class FixtureService {
    constructor(
        @InjectModel('fixtures') private fixtureModel: Model<FixtureDocument>
    ) { }

    async Create(fixture: Fixture) {
        await this.fixtureModel.create(fixture);
    }

    async Update(fixture: Fixture) {
        await this.fixtureModel.findOneAndUpdate(
            // Filter
            {
                _id: fixture._id,
            },
            // Fixture to Update/Insert
            fixture,
            // Options
            {
              // If no document matches, create a new one
              upsert: true,
            }
        );
    }
}