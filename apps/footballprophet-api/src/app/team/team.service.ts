import { Team } from "@footballprophet/domain";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LeagueDocument } from "../league/league.model";


@Injectable()
export class TeamService {
    constructor(
        @InjectModel('leagues') private leagueModel: Model<LeagueDocument>
    ) { }

    async create(leagueId: string, team: Team) {
        const league = await this.leagueModel.findById(leagueId);
        league.teams.push(team);
        await league.save();
    }

    async update(leagueId: string, teamId: string, team: Team) {
        const league = await this.leagueModel.findById(leagueId);
        const teamIndex = league.teams.findIndex(t => t._id === teamId);
        league.teams[teamIndex] = team;
        await league.save();
    }

    async delete(leagueId: string, teamId: string) {
        const league = await this.leagueModel.findById(leagueId);
        league.teams = league.teams.filter(t => t._id !== teamId);
        await league.save();
    }

    
}