import { League, Team } from '@footballprophet/domain';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeagueDocument } from './league.model';

@Injectable()
export class LeagueService {
    constructor(
        @InjectModel('leagues') private leagueModel: Model<LeagueDocument>
    ) { }

    // League methods
    async getAll(): Promise<League[]> {
        return await this.leagueModel.find();
    }

    async getById(id: string): Promise<League> {
        return await this.leagueModel.findById(id);
    }

    async create(league: League) {
        await this.leagueModel.create(league);
    }

    async update(id: string, item: League) {
        throw new Error('Method not implemented.');
    }
}
