import { League, Team, UserRole } from '@footballprophet/domain';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import mongoose, { ObjectId } from 'mongoose';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { LeagueService } from './league.service';

@ApiTags('League')
@Controller('leagues')
export class LeagueController {
  constructor(private leagueService: LeagueService) {}

  @Get()
  async getAll() {
    return await this.leagueService.GetAll();
  }

  @Get(':id')
  async getById(@Param('id') id: mongoose.Types.ObjectId) {
    return await this.leagueService.GetById(id);
  }

  @HasRoles([UserRole.Admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() league: League): Promise<string> {
    await this.leagueService.Create(league);
    return `League created with name '${league.name}'`;
  }

  @HasRoles([UserRole.Admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body() league: League
  ): Promise<string> {
    await this.leagueService.Update(id, league);
    return `League updated with id '${id}'`;
  }

  // Team methods
  @HasRoles([UserRole.Admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/teams')
  async addTeamToLeague(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body() team: Team
  ): Promise<string> {
    await this.leagueService.AddTeamToLeague(id, team);
    return `Team added to league with id '${id}'`;
  }
}
