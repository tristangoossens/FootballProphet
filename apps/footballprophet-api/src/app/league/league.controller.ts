import { League, Team, UserRole } from '@footballprophet/domain';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TeamService } from '../team/team.service';
import { LeagueService } from './league.service';

@Controller('leagues')
export class LeagueController {
    constructor(
        private leagueService: LeagueService,
        private teamService: TeamService,
    ){ }

    @Get()
    async getAll() {
        return await this.leagueService.GetAll();
    }

    @Get(':id')
    async getById(@Param('id') id: ObjectId) {
        return await this.leagueService.GetById(id);
    }

    @HasRoles([UserRole.Admin])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() league: League): Promise<string> {
        await this.leagueService.Create(league);
        return `League created with name '${league.name}'`;
    }


    // Team methods
    @HasRoles([UserRole.Admin])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':id/teams')
    async addTeamToLeague(@Param('id') id: ObjectId, @Body() team: Team): Promise<string> {
        await this.teamService.AddTeamToLeague(id, team);
        return `Team added to league with id '${id}'`;
    }

    @HasRoles([UserRole.Admin])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id/teams/:teamId')
    async removeTeamFromLeague(@Param('id') id: ObjectId, @Param('teamId') teamId: ObjectId): Promise<string> {
        await this.teamService.RemoveTeamFromLeague(id, teamId);
        return `Team removed from league with id '${id}'`;
    }
}
