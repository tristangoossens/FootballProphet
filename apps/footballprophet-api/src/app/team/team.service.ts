import { Team } from '@footballprophet/domain';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { LeagueDocument } from '../league/league.model';

@Injectable()
export class TeamService {
    constructor(
        @InjectModel('leagues') private leagueModel: Model<LeagueDocument>
    ) { }

    async AddTeamToLeague(leagueId: ObjectId, team: Team) {
        await this.leagueModel.findOneAndUpdate(
            // Filter
            {
                _id: leagueId,
            },
            // Team to add
            {
                $push: {
                    teams: team,
                }
            },
        )
    };

    async RemoveTeamFromLeague(leagueId: ObjectId, teamId: ObjectId) {
        await this.leagueModel.findOneAndUpdate(
            // Filter
            {
                _id: leagueId,
            },
            // Team to Remove
            {
                $pull: {
                    teams: {
                        _id: teamId,
                    }
                }
            },
        )
    }
}