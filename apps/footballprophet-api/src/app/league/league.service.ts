import { League, Team } from '@footballprophet/domain';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { LeagueDocument } from './league.model';

@Injectable()
export class LeagueService {
    constructor(
        @InjectModel('leagues') private leagueModel: Model<LeagueDocument>
    ) { }

    // League methods
    async GetAll(): Promise<League[]> {
        return await this.leagueModel.find();
    }

    async GetById(id: ObjectId): Promise<League> {
        return await this.leagueModel.findById(id);
    }

    async Create(league: League) {
        await this.leagueModel.create(league);
    }
}
