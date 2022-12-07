import { League, Team, UserRole } from '@footballprophet/domain';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TeamService } from '../team/team.service';
import { LeagueService } from './league.service';

@Controller('leagues')
export class LeagueController {
    constructor(
        private leagueService: LeagueService,
        private teamService: TeamService
    ){ }

    @Get()
    async getAll() {
        return await this.leagueService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.leagueService.getById(id);
    }

    @HasRoles([UserRole.Admin])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() league: League): Promise<string> {
        await this.leagueService.create(league);
        return `League created with name '${league.name}'`;
    }

    @HasRoles([UserRole.Admin])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':id/teams')
    async addTeam(@Body() team: Team, @Param('id') leagueId: string): Promise<string> {
        await this.teamService.create(leagueId, team);
        return `Team added to league with id "${leagueId}"`;
    }

    @HasRoles([UserRole.Admin])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/teams/:teamId')
    async updateTeam(@Body() team: Team, @Param('id') leagueId: string, @Param('teamId') teamId: string): Promise<string> {
        await this.teamService.update(leagueId, teamId, team);
        return `Team updated in league with id "${leagueId}"`;
    }

    @HasRoles([UserRole.Admin])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id/teams/:teamId')
    async removeTeam(@Param('id') leagueId: string, @Param('teamId') teamId: string): Promise<string> {
        await this.teamService.delete(leagueId, teamId);
        return `Team removed from league with id "${leagueId}"`;
    }
}
